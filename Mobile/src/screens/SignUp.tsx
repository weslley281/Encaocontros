import { useEffect, useState } from 'react';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { states } from '../utils/states';
import { Alert } from 'react-native';
import { api } from '@services/api';

export function SignUp() {
  const { navigate, goBack } = useNavigation<any>();

  const [name, setName] = useState('Weslley Ferraz');
  const [phoneNumber, setPhoneNumber] = useState('(65) 9 8123-3996');
  const [email, setEmail] = useState('weslleyhenrique800@gmail.com');
  const [birthday, setBirthday] = useState('28/11/1995');
  const [cpf, setCpf] = useState('05580134142');
  const [user_type, setUser_type] = useState('client');
  const [addressLine1, setAddressLine1] = useState('Rua Groelandia');
  const [addressLine2, setAddressLine2] = useState('Area E5, Quadra 17');
  const [country, setCountry] = useState('Brasil');
  const [selectedState, setSelectedState] = useState("MT");
  const [city, setCity] = useState('Várzea Grande');
  const [neighborhood, setNeighborhood] = useState('Novo Mundo');
  const [postalCode, setPostalCode] = useState('78149150');
  const [password, setPassword] = useState('wesvag28');
  
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

  function formatBirthday() {
    // Remove qualquer caractere que não seja número
    let modifyBirthday = birthday;
    modifyBirthday = modifyBirthday.replace(/\D/g, '');

    // Formata a data de nascimento no padrão DD/MM/YYYY
    if (modifyBirthday.length >= 8) {
      const birthdayFormatted = modifyBirthday.replace(
        /(\d{2})(\d{2})(\d{4})/,
        '$1/$2/$3'
      );
      return setBirthday(birthdayFormatted);
    } else if (modifyBirthday.length >= 4) {
      const birthdayFormatted = modifyBirthday.replace(
        /(\d{2})(\d{2})/,
        '$1/$2'
      );
      return setBirthday(birthdayFormatted);
    } else {
      // Retorna o valor original se não for possível formatar
      return setBirthday(modifyBirthday);
    }
  }

  function formatDateToISO(date: string): string {
    // Supondo que a data esteja no formato DD/MM/YYYY
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; // Retorna no formato YYYY-MM-DD
  }


  async function registerUser() {
    if (
      name === '' ||
      selectedState === null ||
      phoneNumber === '' ||
      email === '' ||
      addressLine1 === '' ||
      addressLine2 === '' ||
      city === '' ||
      password === '' ||
      birthday === '' ||
      cpf === '' ||
      neighborhood === '' ||
      postalCode === ''
    ) {
      console.log(name, selectedState, phoneNumber, email, addressLine1, addressLine2, city, password, birthday, cpf, neighborhood, postalCode)
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      name,
      phone: phoneNumber,
      email,
      birthday: formatDateToISO(birthday),
      cpf,
      user_type,
      password,
      addressLine1,
      addressLine2,
      country,
      state: selectedState,
      city,
      neighborhood,
      postalCode
    };

    console.log(obj);

    try {
      const response = await api.post('/users', obj);
      console.log(response.status);
      Alert.alert('Alerta', 'Conta criado com sucesso: ' + response.status);
      navigate('SignIn');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  }

  // useEffect(() => {
  //   () => console.log(selectedState);
  // }, [selectedState]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack backgroundColor={'blue.800'} flex={1} px={10} pb={16}>
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treinar ajuda na evolução da sua mente.
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie a sua conta
          </Heading>

          <Input
            placeholder="Nome"
            onChangeText={(text: string) => setName(text)}
            value={name}
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

          <Input
            placeholder="Data de Nascimento (DD/MM/YYYY)"
            keyboardType="numeric"
            onChangeText={(text: string) => setBirthday(text)}
            onBlur={formatBirthday}
            value={birthday}
          />

          <Input
            placeholder="CPF"
            onChangeText={(text: string) => setCpf(text)}
            value={cpf}
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

          <RNPickerSelect
            placeholder={{ label: 'Selecione um estado', value: null }}
            items={states}
            onValueChange={(value) => setSelectedState(value)}
            value={selectedState}
          />

          <Input
            placeholder="Cidade"
            onChangeText={(text: string) => setCity(text)}
            value={city}
          />

          <Input
            placeholder="Bairro"
            onChangeText={(text: string) => setNeighborhood(text)}
            value={neighborhood}
          />

          <Input
            placeholder="Código Postal"
            onChangeText={(text: string) => setPostalCode(text)}
            value={postalCode}
          />         

          <Input
            placeholder="Senha"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />

          <Button title="Criar e Acessar" onPress={() => registerUser()} />
        </Center>

        <Button
          mt={24}
          title="Voltar a Tela de Login"
          variant="outline"
          onPress={() => goBack()}
        />
      </VStack>
    </ScrollView>
  );
}
