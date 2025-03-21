import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Touchable, TouchableOpacity, Alert, FlatList, TextInput } from 'react-native';
import Toolbar from '../../components/Toolbar';
import { globalStyles } from '../../common/styles/globalStyles';
import RoundedImageCard from '../../components/RoundedImageCard';
import { colors } from '../../common/styles/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Genre } from '../../models/GenreListResponse';
import { MovieAPIClient } from '../../network/TheMovieDBClient';
import { TrendingStackParamList } from '../SearchContainer';
import { Movie } from '../../models/UpcomingMoviesResponse';
import MovieSearchItem from '../../components/MovieSearchItem';
import { debounce } from 'lodash';

export const SearchMovie = () => {

    const navigation: NavigationProp<TrendingStackParamList> = useNavigation();

    const client = new MovieAPIClient();
    const [genre, setGenre] = useState<Genre[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            setIsLoading(true);
            try {
                const response = await client.getGenreList();
                setGenre(response);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, []);

    const debouncedFetchMovies = debounce(async (query: string) => {
        if (query.trim() === '') {
            setMovies([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await client.searchMovie(query);
            setMovies(response.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false);
        }
    }, 500);

    useEffect(() => {
        debouncedFetchMovies(searchText);
        return () => {
            debouncedFetchMovies.cancel();
        };
    }, [searchText]);

    function onSearchClose() {
        if (searchText.length > 0) {
            setSearchText('');
        }
        else {
            navigation.goBack();
        }
    }

    function onCategoryClick(item: Genre) {
        navigation.navigate('SearchResult', { grenreId: item.id });
    }

    function onMovieClick(item: Movie) {
        navigation.navigate('MovieDetail', { movieId: item.id });
    }

    return (
        <View style={[style.container]}>
            <View style={style.searchBar}>
                <View style={style.searchArea}>
                    <Image source={require('../../assets/icons/search.png')} style={{ width: 36, height: 36, marginStart: 10 }} />
                    <TextInput
                        placeholder='TV shows, movies and more'
                        style={[style.searchInput, { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#202C43' }]}
                        value={searchText}
                        onChangeText={setSearchText}>
                    </TextInput>
                    <TouchableOpacity onPress={() => { onSearchClose() }}>
                        <Image source={require('../../assets/icons/close.png')} style={{ width: 36, height: 36, marginEnd: 8 }} />
                    </TouchableOpacity>
                </View>
            </View>
            {searchText.length > 0 && (
                <FlatList
                    data={movies}
                    numColumns={1}
                    style={{ marginStart: 20, marginEnd: 20, marginTop: 20 }}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => { onMovieClick(item) }} >
                            <MovieSearchItem
                                imageUrl={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                title={item.title}
                                genre={item.original_language}
                                onPress={(item) => console.log(item)}
                            />
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#202C43' }}>No Movies Available</Text>
                        </View>
                    )}
                />
            )
            }
            {searchText.length == 0 && (
                <FlatList
                    data={genre}
                    numColumns={2}
                    style={{ marginStart: 10, marginEnd: 10, marginTop: 20 }}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => { onCategoryClick(item) }}
                            style={style.item} >
                            <RoundedImageCard
                                imageUrl={'https://image.tmdb.org/t/p/w500/2siOHQYDG7gCQB6g69g2pTZiSia.jpg'}
                                title={item.name}
                                style={style.image} />
                        </Pressable>
                    )}
                />
            )
            }
        </View>
    );

};



const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F6F6FA',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        height: 86,
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderRadius: 30,
        height: 52,
        flexGrow: 1,
        marginEnd: 10,
    },
    searchInput: {
        flexGrow: 1,
        alignSelf: 'center',
        color: '#000',
        paddingStart: 10,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1 / 2,
        margin: 5,
        height: 100,
    },
    image: {
        height: '100%',
        width: '100%',
    }
});

const styles = StyleSheet.create({
});


export default SearchMovie;
