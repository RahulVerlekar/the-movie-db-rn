import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, StaticParamList, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import TrendingMovie from '../TrendingMovie';
import SearchMovie from '../SearchMovie';
import SearchGenreResult from '../SearchResult';


export type TrendingStackParamList = StaticParamList<typeof Stack>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends TrendingStackParamList { }
    }
}

function TrendingScreen() {
    return (
        <TrendingMovie />
    )
    
}

function SearchMovieScreen() {
    return (
        <SearchMovie />
    )
}

function SearchResultsScreen() {
    return (
        <SearchGenreResult />
    )
}

const Stack = createNativeStackNavigator(
    {
        screens: {
            Trending: {
                screen: TrendingScreen,
                options: {
                    headerShown: false,
                },
            },
            SearchMovie: {
                screen: SearchMovieScreen,
                options: {
                    headerShown: false,
                },
            },
            SearchResult: {
                screen: SearchResultsScreen,
                options: {
                    headerShown: false,
                },
            },
        }
    }
);


function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Trending" component={TrendingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchMovie" component={SearchMovieScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchResult" component={SearchResultsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function SearchContainer() {
    return (
        <RootStack />
    );
}
