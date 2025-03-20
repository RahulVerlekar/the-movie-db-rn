import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Touchable, TouchableOpacity, Alert, FlatList } from 'react-native';
import Toolbar from '../../components/Toolbar';
import { globalStyles } from '../../common/styles/globalStyles';
import RoundedImageCard from '../../components/RoundedImageCard';

const DATA_MOVIE = [
    'Avatar: The Way of Water',
    'Black Panther: Wakanda Forever',
    'The Batman',
    'Doctor Strange in the Multiverse of Madness',
    'Jurassic World Dominion',
    'Thor: Love and Thunder'
]

export const TrendingMovie = () => {
    function onSearchPress() {
        Alert.alert('Search Pressed');
    }

    function onMovieClick() {
        console.log('Watch Pressed');
    }

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
                data={DATA_MOVIE}
                renderItem={({ item }) => (
                    <Pressable onPress={() => { onMovieClick() }}>
                        <View style={{ padding: 10, marginStart: 10, marginEnd: 10 }}>
                            <RoundedImageCard
                                imageUrl="https://image.tmdb.org/t/p/w500/2siOHQYDG7gCQB6g69g2pTZiSia.jpg"
                                title={item}
                                style={{ width: '100%', height: 180 }}
                            />
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={globalStyles.text}>No Movies Available</Text>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={{ paddingStart: 24, paddingEnd: 24 }}>
                        <Text style={[globalStyles.title, { marginTop: 24 }]}>
                            Trending Movies
                        </Text>
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
        backgroundColor: '#fff',
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
