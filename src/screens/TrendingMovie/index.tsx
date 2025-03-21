import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Touchable, TouchableOpacity, Alert, FlatList } from 'react-native';
import Toolbar from '../../components/Toolbar';
import { globalStyles } from '../../common/styles/globalStyles';
import RoundedImageCard from '../../components/RoundedImageCard';
import { MovieAPIClient } from '../../network/TheMovieDBClient';
import { Movie } from '../../models/UpcomingMoviesResponse';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TrendingStackParamList } from '../SearchContainer';


export const TrendingMovie = () => {

    const navigation: NavigationProp<TrendingStackParamList> = useNavigation();

    function onSearchPress() {
        navigation.navigate('SearchMovie');
    }

    function onMovieClick(item: Movie) {
        Alert.alert(`Movie Pressed: ${item.title}`);
    }

    const client = new MovieAPIClient();

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await client.getUpcomingMovies();
                setMovies(response.results);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };
        fetchTrendingMovies();
    }, []);

    return (
        <View style={[globalStyles.tabContainer, style.container]}>
            <View style={style.toolbarContainer}>
                <Text style={[globalStyles.title, { marginTop: 24 }]}>
                    Watch
                </Text>
                <TouchableOpacity onPress={() => { onSearchPress() }}>
                    <Image source={require('../../assets/icons/search.png')} style={{ width: 48, height: 48, marginEnd: 8 }} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={movies}
                numColumns={1}
                
                renderItem={({ item }) => (
                    <Pressable onPress={() => { onMovieClick(item) }}>
                        <View style={{ padding: 10, marginStart: 10, marginEnd: 10, flex: 1 }}>
                            <RoundedImageCard
                                imageUrl={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                title={item.title}
                                style={{ width: '100%', height: 180 }}
                            />
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item, index) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={globalStyles.text}>No Movies Available</Text>
                    </View>
                )}
            />

        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F6F6FA',
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
});

export default TrendingMovie;
