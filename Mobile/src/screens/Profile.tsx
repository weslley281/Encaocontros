import { VStack, Center, ScrollView, Heading, View } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

import { HomeHeader } from '@components/HomeHeader';
import { Input } from '@components/Input';
import { useState } from 'react';
import { useAuth } from '@hooks/auth';
import { Button } from '@components/Button';
import { states } from '@utils/states';
import { Alert } from 'react-native';
import { api } from '@services/api';

export function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const [birthday, setBirthday] = useState(user.birthday);
  const [cpf, setCpf] = useState(user.cpf);
  const [user_type, setUser_type] = useState(user.user_type);
  const [addressLine1, setAddressLine1] = useState(user.addressLine1);
  const [addressLine2, setAddressLine2] = useState(user.addressLine2);
  const [country, setCountry] = useState(user.country);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [neighborhood, setNeighborhood] = useState(user.neighborhood);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [password, setPassword] = useState(user.password);

  function formatPhoneNumber() {
    // Limpa qualquer caractere que não seja número
    let modifyPhoneNumber = phoneNumber;
    modifyPhoneNumber = modifyPhoneNumber.replace(/\D/g, '');
    // Formata o número de acordo com o padrão brasileiro
    if (modifyPhoneNumber.length === 11) {
      // Formato para telefone celular: (99) 99999-9999
      const phoneNumberFormated = modifyPhoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3'
      );
      return setPhoneNumber(phoneNumberFormated);
    } else if (modifyPhoneNumber.length === 10) {
      // Formato para telefone fixo: (99) 9999-9999
      const phoneNumberFormated = modifyPhoneNumber.replace(
        /(\d{2})(\d{4})(\d{4})/,
        '($1) $2-$3'
      );
      return setPhoneNumber(phoneNumberFormated);
    } else {
      // Retorna o número original se não for possível formatá-lo
      return setPhoneNumber(modifyPhoneNumber);
    }
  }

  async function updateUser() {
    if (
      name === '' ||
      state === null ||
      phoneNumber === '' ||
      email === '' ||
      addressLine1 === '' ||
      addressLine2 === '' ||
      city === '' ||
      country === ''
    ) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      user_id: user.user_id,
      name,
      address_line1: addressLine1,
      address_line2: addressLine2,
      city,
      state,
      country,
      phone: phoneNumber,
      email,
    };

    console.log(obj);

    try {
      const response = await api.put('users/update', obj);
      console.log(response.status);
      Alert.alert('Alerta', 'Conta alterada com sucesso: ' + response.status);
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack backgroundColor={'blueGray.700'} flex={1}>
        <HomeHeader />
        <Center px={5}>
          <Heading
            color="gray.100"
            fontSize="xl"
            mb={6}
            mt={6}
            fontFamily="heading"
          >
            Edite a sua conta
          </Heading>

          <Input
            placeholder="Nome"
            onChangeText={(text: string) => setName(text)}
            value={name}
          />
          <Input
            placeholder="Endereço Linha 1"
            onChangeText={(text: string) => setAddressLine1(text)}
            value={addressLine1}
          />
          <Input
            placeholder="Endereço Linha 2"
            onChangeText={(text: string) => setAddressLine2(text)}
            value={addressLine2}
          />
          <Input
            placeholder="Cidade"
            onChangeText={(text: string) => setCity(text)}
            value={city}
          />

          <RNPickerSelect
            placeholder={{ label: 'Selecione um estado', value: null }}
            items={states}
            onValueChange={(value) => setState(value)}
            value={state}
          />

          <Input
            value="Brasil"
            onChangeText={(text: string) => setCountry(text)}
          />

          <Input
            placeholder="Telefone"
            keyboardType="numeric"
            onChangeText={(text: string) => setPhoneNumber(text)}
            onBlur={formatPhoneNumber}
            value={phoneNumber}
          />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />

          <Button title="Criar e Acessar" onPress={() => updateUser()} />
        </Center>
      </VStack>
    </ScrollView>
  );
}
