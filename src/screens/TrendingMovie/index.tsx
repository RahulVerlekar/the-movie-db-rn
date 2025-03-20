import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toolbar from '../../components/Toolbar';
import { globalStyles } from '../../common/styles/globalStyles';

export const TrendingMovie = () => {
  return (
    <View style={[globalStyles.tabContainer, style.container]}>
        <Toolbar title='Watch' icon={
            <Text style={{ fontSize: 24, color: '#2E2739' }}/>
        } />
        <Text style={globalStyles.title}>
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
  });

export default TrendingMovie;
