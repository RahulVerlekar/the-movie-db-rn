import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface RoundedImageCardProps {
    imageUrl: string;
    title?: string;
    style?: object;
}

const RoundedImageCard: React.FC<RoundedImageCardProps> = ({ imageUrl, title, style }) => {
    return (
        <View style={[styles.container, style]}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
            {title && (
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <Text style={styles.title}>{title}</Text>
                </LinearGradient>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        justifyContent: 'flex-end'
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginStart: 20,
        marginBottom: 20
    },
});

export default RoundedImageCard;