import { Button, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MovieSearchItem from "../../components/MovieSearchItem";
import { globalStyles } from "../../common/styles/globalStyles";
import LinearGradient from "react-native-linear-gradient";

const DATA_MOVIE_GENRE = [
    { name: 'Alice In wonderland', genre: 'Fantasy' },
    { name: 'The Dark Knight', genre: 'Action' },
    { name: 'The Shawshank Redemption', genre: 'Drama' },
    { name: 'The Godfather', genre: 'Crime' },
    { name: 'The Lord of the Rings: The Return of the King', genre: 'Adventure' },
    { name: 'Pulp Fiction', genre: 'Thriller' },
    { name: 'Forrest Gump', genre: 'Romance' },
    { name: 'Inception', genre: 'Science Fiction' },
    { name: 'The Matrix', genre: 'Action' },
    { name: 'Fight Club', genre: 'Drama' },
]

const MovieDetail = () => {
    return (
        <View style={style.container}>
            <View style={{}}>
                <View style={{ height: 400, width: '100%', position: 'relative' }}>
                    <View style={[style.toolbarContainer, { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }]}>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={require('../../assets/icons/back.png')} style={{ width: 30, height: 30, marginEnd: 8, tintColor: "#fff" }} />
                        </TouchableOpacity>
                        <Text style={[globalStyles.title, { alignSelf: 'center', verticalAlign: 'middle', marginBottom: 0, color: "#fff" }]}>
                            Watch
                        </Text>
                    </View>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w500/2siOHQYDG7gCQB6g69g2pTZiSia.jpg' }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover" />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.8)']}
                        style={style.gradient}
                    />
                </View>
                <View style={{ height: 375, position: 'absolute', top: 202, bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column' }}>
                    <Text style={[globalStyles.title, { marginTop: 24, color: '#fff', alignSelf: 'center'}]}>
                        In theaters december 22, 2021
                    </Text>
                    <Pressable style={{ marginTop: 0, marginStart: 66, marginEnd: 66, borderRadius: 8, height: 50 }}>
                        <View style={{ backgroundColor: '#61C3F2', borderRadius: 10, height: '100%', alignContent: "center", justifyContent: "center" }}>
                            <Text style={[{ color: '#fff', fontSize: 16, paddingBottom: 0, textAlign: 'center' }]}>
                                Get Tickets
                            </Text>
                        </View>
                    </Pressable>
                    <View style={{ marginTop: 10, marginStart: 66, marginEnd: 66, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#61C3F2', borderRadius: 10, height: 50, alignContent: "center", justifyContent: "center" }}>
                        <Image source={require('../../assets/icons/play.png')} style={{ width: 8, height: 12, marginEnd: 8 }} />
                        <Text style={[{ color: '#fff', fontSize: 16 , paddingBottom: 0}]}>
                            Watch Trailer
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#F6F6FA', flexDirection: 'column' }}>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Genres</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
                        {['Action', 'Thriller', 'Science', 'Fiction'].map((genre, index) => (
                            <View key={index} style={{ backgroundColor: '#61C3F2', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, marginRight: 10, marginBottom: 10 }}>
                                <Text style={{ color: '#fff' }}>{genre}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Overview</Text>
                    <Text style={{ fontSize: 14, color: '#202C43' }}>
                        As A Collection Of History's Worst Tyrants And Criminal Masterminds Gather To Plot A War To Wipe Out Millions, One Man Must Race Against Time To Stop Them. Discover The Origins Of The Very First Independent Intelligence Agency In The King's Man. The Comic Book “The Secret Service” By Mark Millar And Dave Gibbons.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F6F6FA',
        flexDirection: 'column',
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
        backgroundColor: 'transparent',
        height: 64,

    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 400,
    }
});

export default MovieDetail;