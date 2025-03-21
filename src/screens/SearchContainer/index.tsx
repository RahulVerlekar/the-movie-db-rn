import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, StaticParamList, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import TrendingMovie from '../TrendingMovie';
import SearchMovie from '../SearchMovie';
import SearchGenreResult from '../SearchResult';
import MovieDetail from '../MovieDetail';


export type TrendingStackParamList = {
    Trending: undefined;
    SearchMovie: undefined;
    SearchResult: { grenreId: number };
    MovieDetail: { movieId: number };
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

function MovieDetailScreen() {
    return (
        <MovieDetail />
    )
}

const Stack = createNativeStackNavigator(
    {
        screens: {
            Trending: {
                screen: TrendingScreen,
                options: {
                    headerShown: false,
                }
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
                }
            },
            MoviewDetail: {
                screen: MovieDetail,
                options: {
                    headerShown: false,
                }
            }
        }
    }
);


function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Trending" component={TrendingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchMovie" component={SearchMovieScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchResult" component={SearchResultsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function SearchContainer() {
    return (
        <RootStack />
    );
}
