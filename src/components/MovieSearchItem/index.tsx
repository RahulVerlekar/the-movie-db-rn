import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RoundedImageCard from "../RoundedImageCard";
import { globalStyles } from "../../common/styles/globalStyles";
import { colors } from "../../common/styles/colors";

type MovieSearchItemProps = {
    imageUrl: string;
    title: string;
    genre: string;
    onPress: (item: any) => void;
}

const MovieSearchItem = ({ imageUrl, title, genre, onPress }: MovieSearchItemProps) => {
    return (
        <View style={style.container}>
            <RoundedImageCard
                imageUrl={imageUrl}
                style={style.image} />
            <View style={style.textContainer}>
                <Text style={globalStyles.title}>{title}</Text>
                <Text style={[style.genre, {color: colors.lightGray}]}>{genre}</Text>
            </View>
            <Pressable style={style.actionContainer} onPress={() => { onPress({ imageUrl, title, genre }) }}>
                <Image 
                    source={require('../../assets/icons/more-vert.png')}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain" />
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingStart: 20,
        flexDirection: 'column',
    },
    actionContainer: {
        alignSelf: 'center',
    },
    genre: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
    },
    image: {
        width: 130,
    }
});

export default MovieSearchItem;