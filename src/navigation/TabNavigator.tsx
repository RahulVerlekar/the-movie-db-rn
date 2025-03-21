import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, Text } from 'react-native';
import TrendingMovie from '../screens/TrendingMovie';
import { globalStyles } from '../common/styles/globalStyles';
import { colors } from '../common/styles/colors';
import SearchMovie from '../screens/SearchMovie';
import SearchResult from '../screens/SearchResult';
import MovieDetail from '../screens/MovieDetail';

// Placeholder components for additional tabs
const UpcomingScreen = () => <Text>Upcoming Movies</Text>;
const SearchScreen = () => <Text>Search</Text>;
const ProfileScreen = () => <Text>Profile</Text>;

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: globalStyles.tabBar,
          tabBarItemStyle: globalStyles.tabBarItem,
          tabBarLabelStyle: globalStyles.tabBarLabel,
          tabBarActiveTintColor: colors.background,
          tabBarInactiveTintColor: colors.grayPurple,
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={MovieDetail} 
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../assets/icons/dashboard.png')} style={{ tintColor: color, width: 18, height: 18, marginBottom: 8 }} />
            ),
          }}
        />
        <Tab.Screen 
          name="Watch" 
          component={UpcomingScreen} 
          options={{
            tabBarIcon: ({ color }) => (
                <Image source={require('../assets/icons/watch.png')} style={{ tintColor: color, width: 18, height: 18, marginBottom: 8 }} />
            ),
          }}
        />
        <Tab.Screen 
          name="Media Library" 
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
                <Image source={require('../assets/icons/media.png')} style={{ tintColor: color, width: 18, height: 18, marginBottom: 8 }} />
            ),
          }}
        />
        <Tab.Screen 
          name="More" 
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
                <Image source={require('../assets/icons/more.png')} style={{ tintColor: color, width: 24, height: 24, marginBottom: 8 }} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
  
};

export default TabNavigator;
