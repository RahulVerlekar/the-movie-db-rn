import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrendingMovie from '../screens/TrendingMovie';
import SearchMovie from '../screens/SearchMovie';

const Stack = createStackNavigator();

const WatchTabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrendingMovie" component={TrendingMovie} />
      <Stack.Screen name="SearchMovie" component={SearchMovie} />
    </Stack.Navigator>
  );
};

export default WatchTabNavigator;
