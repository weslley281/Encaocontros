import {
  VStack,
  Center,
  HStack,
  Heading,
  Text,
  View,
  Modal,
  Box,
  Button,
  Image,
} from 'native-base';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '@components/HomeHeader';
import { CustomButtonAntDesign } from '@components/ButtonIconAntDesign';
import { CustomButtonIonicons } from '@components/ButtonIconIonicons';
import { CustomButtonSVG1 } from '@components/ButtonIconSVG1';
import { CustomButtonSVG2 } from '@components/ButtonIconSVG2';
import { useState } from 'react';
import { MartialArts } from './modals/MartialArts';
import { ip } from '@services/api';


export function Dashboard() {
  const { navigate } = useNavigation<any>();
  const dogs = [
    {
      id: 1,
      name: 'Rex',
      age: '4 anos',
      breed: 'Labrador',
      image: 'https://www.racoesreis.com.br/wordpress/wp-content/uploads/cachorro-olhar.jpg',
    },
    {
      id: 2,
      name: 'Bella',
      age: '1 ano',
      breed: 'Golden Retriever',
      image: 'https://s2-vidadebicho.glbimg.com/I0fkffnUQuMDZiyCl8xMgUT1BJk=/0x0:1476x984/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_fb623579cd474803aedbbbbae014af68/internal_photos/bs/2022/j/m/ZfsRF9QsaDKBdhKxGZrQ/2022-05-31-1-entenda-como-um-cao-guia-e-treinado-e-qual-a-sua-importancia-para-uma-pcd.jpeg',
    },
    {
      id: 3,
      name: 'Thorzinho',
      age: '1 ano',
      breed: 'Viralata',
      image: 'https://midias.correiobraziliense.com.br/_midias/jpg/2024/02/06/675x450/1_victor_grabarczyk_n04fifhhv_k_unsplash-34921445.jpg?20240206170332?20240206170332',
    },
  ];

  return (
    <VStack backgroundColor={'blue.800'} flex={1}>
      <HomeHeader />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <VStack flex={1} alignItems="center" justifyContent="center" px="4">
          {dogs.map((dog) => (
            <Box
              key={dog.id}
              bg="gray.100"
              borderRadius="md"
              shadow="3"
              p="5"
              mb="4"
              alignItems="center"
              width="90%"
            >
              <Image
                source={{ uri: dog.image }}
                alt={dog.name}
                size="xl"
                borderRadius="md"
              />

              <Text fontSize="xl" fontWeight="bold" mt="3">
                {dog.name}
              </Text>
              <Text>{dog.age}</Text>
              <Text>{dog.breed}</Text>
              <HStack space={4} mt="4">
                <Button colorScheme="red">Não Gostei</Button>
                <Button colorScheme="green">Gostei</Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
