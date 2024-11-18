import { StyleSheet} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { NativeBaseProvider, Box, Center, Heading, Text, Button } from 'native-base';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const handleGetStarted = () => {
    navigation.navigate('Login'); // Altere para a próxima tela que você deseja implementar
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#007fff" safeArea>
        <Center flex={1} px={4}>
          <Heading size="xl" color="#FFB74D" mb={4}>
            EnCãoContros
          </Heading>

          <Text textAlign="center" color="#F2E6D7" fontSize="lg" mb={8}>
          Encontre o par perfeito para o seu amigo de quatro patas! Entre,
          conheça, e combine encontros para seus cães.
          </Text>
          
          <Button
          onPress={handleGetStarted}
          bg="#229f64"
          _pressed={{ bg: "#FFA726" }}
          size="lg"
          borderRadius="full"
        >
          Começar
        </Button>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
