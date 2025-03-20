import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toolbar from '../../components/Toolbar';

export const TrendingMovie = () => {
  return (
    <View style={style.container}>
        <Toolbar title='Watch' icon={
            <Text style={{ fontSize: 24, color: '#2E2739' }}/>
        } />
        <Text style={style.title}>
            Trending Movies
        </Text>
    </View>
  );
};

const style = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });


export default TrendingMovie;
