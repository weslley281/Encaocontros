import { Center, Heading, VStack } from 'native-base';

type Props = { title: string };

export function ScreenHeader({ title }: Props) {
  return (
    <Center bgColor={'gray.600'} pb={6} pt={16} mb={2}>
      <Heading color={'gray.100'} fontSize={'xl'}>
        {title}
      </Heading>
    </Center>
  );
}
