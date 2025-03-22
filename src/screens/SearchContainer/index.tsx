import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrendingMovie from '../TrendingMovie';
import SearchMovie from '../SearchMovie';
import SearchGenreResult from '../SearchResult';
import MovieDetail from '../MovieDetail';
import BookingScreenSelect from '../BookingScreen';
import SeatConfirmation from '../SeatConfirmation';


export type TrendingStackParamList = {
    Trending: undefined;
    SearchMovie: undefined;
    SearchResult: { grenreId: number };
    MovieDetail: { movieId: number };
    BookingScreen: undefined;
    SeatConfirmation: { arrangements: number[][], name: string };
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
function BookingScreen() {
    return (
        <BookingScreenSelect />
    )
}
function SeatConfirmationScreen() {
    return (
        <SeatConfirmation />
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
            },
            BookingScreen: {
                screen: BookingScreen,
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
            <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SeatConfirmation" component={SeatConfirmation} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function SearchContainer() {
    return (
        <RootStack />
    );
}
