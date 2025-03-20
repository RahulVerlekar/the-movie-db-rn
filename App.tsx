import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <TabNavigator />
    </SafeAreaProvider>
  );
};

export default App;
