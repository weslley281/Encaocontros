import { useState } from 'react';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useForm, Controller } from 'react-hook-form';

interface IData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
  level: string;
}

export function SignUp() {
  const { goBack } = useNavigation<AuthNavigatorRoutesProps>();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IData>({
    defaultValues: {
      level: 'user',
    },
  });

  function handleSignUp(data: IData) {
    console.log(data);
  }

  console.log('errors', errors);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie a conta
          </Heading>

          <Text color={'white'}>{errors.name?.message}</Text>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
            name="name"
            rules={{ required: 'Preencha o nome' }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
            name="email"
            rules={{
              required: 'Preencha o email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email Inválido',
              },
            }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
            name="phone"
            rules={{ required: 'Preencha o telefone' }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.password2?.message}
              />
            )}
            name="password"
            rules={{ required: 'Preencha a senha' }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                autoCapitalize="none"
                value={value}
                secureTextEntry
              />
            )}
            name="password2"
            rules={{ required: 'Repita a senha' }}
          />

          <Button
            title="Criar e Acessar"
            onPress={handleSubmit(handleSignUp)}
          />
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
