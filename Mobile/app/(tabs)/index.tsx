import { Image, StyleSheet, Platform, ScrollView, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { Box } from 'native-base';

export default function HomeScreen() {
  return (
    <Box flex={1} bg="#A7C7E7" safeArea>
      <View>
        <Text>EnCãoContros!</Text>
        <HelloWave />
      </View>
      <View>
        <Text>Step 1: Try it</Text>
        <Text>
          Edit <Text>app/(tabs)/index.tsx</Text> to see changes.
          Press{' '}
          <Text>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text>Step 2: Explore</Text>
        <Text>
          Tap the Explore tab to learn more about what's included in this starter app.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text>Step 3: Get a fresh start</Text>
        <Text>
          When you're ready, run{' '}
          <Text>npm run reset-project</Text> to get a fresh{' '}
          <Text>app</Text> directory. This will move the current{' '}
          <Text>app</Text> to{' '}
          <Text>app-example</Text>.
        </Text>
      </View>
   </Box>
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
