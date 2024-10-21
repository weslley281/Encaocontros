import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { UserPhoto } from './UserPhoto';
import { TouchableOpacity } from 'react-native';

export function HomeHeader() {
  return (
    <HStack bg={'gray.600'} pt={16} px={8} alignItems={'center'}>
      <UserPhoto
        source={{
          uri: 'https://scontent.fcgb10-1.fna.fbcdn.net/v/t39.30808-1/336286057_1213537462700589_64666111073547397_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=107&cb=99be929b-59f725be&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeFRqZ-STsQwEeAMP7Bgxs4sG6-9R0hJyF8br71HSEnIXzotbsQ8JgpxHL6zN4VxW15ZUMRVMSdlhOQrdiLhHAGd&_nc_ohc=LQX-af8cb9UAX8n_0JN&_nc_ht=scontent.fcgb10-1.fna&oh=00_AfC-J1cHg7vOFAYfWhC-rvsUULUTBbnU3NpI4MpYwaenBA&oe=64D92F13',
        }}
        size={16}
        alt="Imagem do usuário"
      />
      <VStack flex={1} ml={3}>
        <Text color={'gray.100'} fontSize={'md'}>
          Olá,
        </Text>

        <Heading color={'gray.100'} fontSize={'md'}>
          Weslley Ferraz
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" size={7} color={'red.500'} />
      </TouchableOpacity>
    </HStack>
  );
}
