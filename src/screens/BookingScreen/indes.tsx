import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, StaticParamList, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import TrendingMovie from '../TrendingMovie';
import SearchMovie from '../SearchMovie';
import SearchGenreResult from '../SearchResult';
import MovieDetail from '../MovieDetail';
import { TheatreScreen } from '../../components/TheatreScreen';

export default function BookingScreen() {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
                Search Container
            </Text>
            <TheatreScreen theatreId="12345" />
            <View style={{ flex: 1, backgroundColor: 'white', padding: 4, flexDirection: 'column', height: 200, width: 150 }}>
                <TheatreScreen theatreId="12345" />
            </View>
        </View>
    );
}
