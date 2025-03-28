import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MovieSearchItem from "../../components/MovieSearchItem";
import { globalStyles } from "../../common/styles/globalStyles";
import { MovieAPIClient } from "../../network/TheMovieDBClient";
import { Movie } from "../../models/UpcomingMoviesResponse";
import { use, useEffect, useState } from "react";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { TrendingStackParamList } from "../SearchContainer";

const SearchGenreResult = () => {

    const route = useRoute();
    const navigation: NavigationProp<TrendingStackParamList> = useNavigation();
    const { grenreId } = route.params as { grenreId: number };

    const client = new MovieAPIClient();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await client.getMovieForGenre(grenreId);
                setMovies(response.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, [grenreId]);

    function onMovieClick(item: Movie) {
        navigation.navigate('MovieDetail', { movieId: item.id });
    }

    return (
        <View style={style.container}>
            <View style={style.toolbarContainer}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={require('../../assets/icons/back.png')} style={{ width: 30, height: 30, marginEnd: 8 }} />
                </TouchableOpacity>
                <Text style={[globalStyles.title, { alignSelf: 'center', verticalAlign: 'middle', marginBottom: 0 }]}>
                    {movies.length} results found
                </Text>
            </View>
            <Text style={style.searchResults}>Top Results</Text>
            <View style={{ height: 1, backgroundColor: '#E4E7EC', marginTop: 8, marginStart: 20, marginEnd: 20 }} />
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
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F6F6FA',
    },
    searchResults: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: '#202C43',
        height: 15,
        marginStart: 20,
        marginTop: 30
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        verticalAlign: 'middle',
        paddingStart: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        backgroundColor: '#FFFFFF',
        height: 64,

    },
});

export default SearchGenreResult;