import { IPressableProps, Pressable, Text } from 'native-base';

type Props = IPressableProps & { name: string; isActive: boolean };

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      rounded={'md'}
      bg={'gray.500'}
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
      _pressed={{ borderColor: 'green.500', borderWidth: 1 }}
      isPressed={isActive}
      {...rest}
    >
      <Text
        color={isActive ? 'gray.200' : 'gray.200'}
        textTransform={'uppercase'}
        fontWeight={'bold'}
      >
        {name}
      </Text>
    </Pressable>
  );
}
