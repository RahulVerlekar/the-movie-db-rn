import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingMovie } from './src/screens/TrendingMovie';

const App = () => {
  return (
    <View style={style.parent}>
        <View style={style.container}>
            <TrendingMovie />
        </View>
        <View style={style.bottomBar}/>
    </View>
  );
};

const style = StyleSheet.create({
    parent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    bottomBar: {
        backgroundColor: '#2E2739',
        height: 75,
        borderTopStartRadius: 27,
        borderTopEndRadius: 27,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})

export default App;
