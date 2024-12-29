import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import { useAuth } from '@hooks/auth';

export function HomeHeader() {
  const { signOut, user } = useAuth();

  return (
    <HStack bg="green.600" pt={16} pb={5} px={8} alignItems="center">
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Bem Vindo,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="red.700" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
