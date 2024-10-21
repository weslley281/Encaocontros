import { HStack, Heading, Text, VStack } from 'native-base';

type Props = { title: string };

export function HistoryCard({ title }: Props) {
  return (
    <HStack
      bgColor={'gray.600'}
      w={'full'}
      px={5}
      mb={5}
      rounded={'md'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack mr={5} flex={1}>
        <Heading color={'white'} fontSize={'md'} textTransform={'capitalize'}>
          {title}
        </Heading>
        <Text color={'gray.100'} fontSize={'md'} numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>
      <Text color={'gray.300'} fontSize={'md'}>
        15:00
      </Text>
    </HStack>
  );
}
