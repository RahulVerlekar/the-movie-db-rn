import { Alert, Button, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MovieSearchItem from "../../components/MovieSearchItem";
import { globalStyles } from "../../common/styles/globalStyles";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import { MovieDetailsResponse } from "../../models/MovieDetailsResponse";
import { MovieAPIClient } from "../../network/TheMovieDBClient";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { TrendingStackParamList } from "../SearchContainer";

const MovieDetail = () => {

    const [movie, setMovie] = useState<MovieDetailsResponse>()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const route = useRoute();
    const navigation:  NavigationProp<TrendingStackParamList> = useNavigation();
    const { goBack } = navigation;
    const { movieId } = route.params as { movieId: number };

    const client = new MovieAPIClient();
    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            try {
                const response = await client.getMovieDetails(movieId);
                setMovie(response);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, []);

    function onGetTickets() {
        navigation.navigate('BookingScreen');
    }

    const renderGenreBadge = (genre: string, index: number) => (
        <View key={index} style={styles.genreBadge}>
            <Text style={styles.genreText}>{genre}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.imageContainer}>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity onPress={() => { goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} style={styles.backIcon} />
                        </TouchableOpacity>
                        <Text style={[globalStyles.title, styles.toolbarTitle]}>
                            Watch
                        </Text>
                    </View>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}` }}
                        style={styles.movieImage}
                        resizeMode="cover" />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.gradient}
                    />
                </View>
                <View style={styles.overlayContainer}>
                    <Text style={[globalStyles.title, styles.releaseDate]}>
                        {movie?.release_date ? `In theaters ${new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
                    </Text>
                    <Pressable style={styles.getTicketsButton} onPress={() => {
                        onGetTickets();
                     }}>
                        <View style={styles.getTicketsButtonContent}>
                            <Text style={styles.getTicketsButtonText}>
                                Get Tickets
                            </Text>
                        </View>
                    </Pressable>
                    <View style={styles.watchTrailerButton}>
                        <Image source={require('../../assets/icons/play.png')} style={styles.playIcon} />
                        <Text style={styles.watchTrailerButtonText}>
                            Watch Trailer
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailsContent}>
                    <Text style={styles.sectionTitle}>Genres</Text>
                    <View style={styles.genresContainer}>
                        {movie?.genres.map((item, index) => (
                                renderGenreBadge(item.name, index)
                        ))}
                    </View>
                    <View style={{ height: 1, backgroundColor: '#E4E7EC', marginBottom: 10, marginTop: 10 }} />
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.overviewText}>
                        {movie?.overview}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F6F6FA',
        flexDirection: 'column',
    },
    imageContainer: {
        height: 400,
        width: '100%',
        position: 'relative',
    },
    toolbarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 20,
        backgroundColor: 'transparent',
        height: 64,
    },
    backIcon: {
        width: 30,
        height: 30,
        marginEnd: 8,
        tintColor: "#fff",
    },
    toolbarTitle: {
        alignSelf: 'center',
        verticalAlign: 'middle',
        marginBottom: 0,
        color: "#fff",
    },
    movieImage: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 400,
    },
    overlayContainer: {
        height: 375,
        position: 'absolute',
        top: 202,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    releaseDate: {
        marginTop: 24,
        color: '#fff',
        alignSelf: 'center',
    },
    getTicketsButton: {
        marginTop: 0,
        marginStart: 66,
        marginEnd: 66,
        borderRadius: 8,
        height: 50,
    },
    getTicketsButtonContent: {
        backgroundColor: '#61C3F2',
        borderRadius: 10,
        height: '100%',
        alignContent: "center",
        justifyContent: "center",
    },
    getTicketsButtonText: {
        color: '#fff',
        fontSize: 16,
        paddingBottom: 0,
        textAlign: 'center',
    },
    watchTrailerButton: {
        marginTop: 10,
        marginStart: 66,
        marginEnd: 66,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#61C3F2',
        borderRadius: 10,
        height: 50,
        alignContent: "center",
        justifyContent: "center",
    },
    playIcon: {
        width: 8,
        height: 12,
        marginEnd: 8,
    },
    watchTrailerButtonText: {
        color: '#fff',
        fontSize: 16,
        paddingBottom: 0,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: '#F6F6FA',
        flexDirection: 'column',
    },
    detailsContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginBottom: 10,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    genreBadge: {
        backgroundColor: '#61C3F2',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    genreText: {
        color: '#fff',
    },
    overviewText: {
        fontFamily: 'Poppins-Regular',
        lineHeight: 19,
        fontSize: 12,
        color: '#8f8f8f',
    },
    searchResults: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: '#202C43',
        height: 15,
        marginStart: 20,
        marginTop: 30,
    },
});

export default MovieDetail;