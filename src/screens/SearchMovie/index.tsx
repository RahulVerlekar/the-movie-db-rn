import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Touchable, TouchableOpacity, Alert, FlatList, TextInput } from 'react-native';
import Toolbar from '../../components/Toolbar';
import { globalStyles } from '../../common/styles/globalStyles';
import RoundedImageCard from '../../components/RoundedImageCard';
import { colors } from '../../common/styles/colors';

const DATA_MOVE_GENERE = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western'
]

export const SearchMovie = () => {
    function onSearchClose() {
        Alert.alert('Search Pressed');
    }

    function onCategoryClick(data: string) {
        Alert.alert(`Category Pressed: ${data}`);
    }

    return (
        <View style={[globalStyles.tabContainer, style.container]}>
            <View style={style.searchBar}>
                <View style={style.searchArea}>
                    <Image source={require('../../assets/icons/search.png')} style={{ width: 36, height: 36, marginStart: 10 }} />
                    <TextInput
                        placeholder='TV shows, movies and more'
                        style={[style.searchInput, { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#202C43' }]}>
                    </TextInput>
                    <TouchableOpacity onPress={() => { onSearchClose() }}>
                        <Image source={require('../../assets/icons/close.png')} style={{ width: 36, height: 36, marginEnd: 8 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={DATA_MOVE_GENERE}
                numColumns={2}
                style={{ margin: 10 }}
                renderItem={({ item }) => (
                    <Pressable onPress={() => { onCategoryClick(item) }}
                        style={style.item} >
                        <RoundedImageCard
                            imageUrl="https://image.tmdb.org/t/p/w500/2siOHQYDG7gCQB6g69g2pTZiSia.jpg"
                            title={item}
                            style={style.image} />
                    </Pressable>
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
        flex: 1/2,
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
