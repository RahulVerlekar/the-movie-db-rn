import * as React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, NavigationProp, StaticParamList, useNavigation } from '@react-navigation/native';
import { TheatreScreen } from '../../components/TheatreScreen';
import { globalStyles } from '../../common/styles/globalStyles';
import { TrendingStackParamList } from '../SearchContainer';

export default function BookingScreenSelect() {

    const seatingArrangement: number[][] = Array.from({ length: (Math.floor(Math.random() * 5) + 20) }, (i) =>
        Array.from({ length: 10 }, (j) => Math.floor(Math.random() * 5) + 1)
    );

    function getRandomArrangement() {
        const arrangement: number[][] = [];
        for (let i = 0; i < 20; i++) {
            const row: number[] = [];
            for (let j = 0; j < 10; j++) {
                row.push(Math.floor(Math.random() * 5) + 1);
            }
            arrangement.push(row);
        }
        return arrangement;
    }
    const arrangements = [
        getRandomArrangement(),
        getRandomArrangement(),
    ]

    const onScreenSelected = (arrangement: number[][], name: string) => {
        navigation.navigate('SeatConfirmation', {
            arrangements: arrangement,
            name: name
        })
    }
    const navigation: NavigationProp<TrendingStackParamList> = useNavigation();
    //dates from today to 5 more days
    const dates = [
        " 5 Mar",
        " 6 Mar",
        " 7 Mar",
        " 8 Mar",
        " 9 Mar",
        " 10 Mar"
    ];

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginStart: 16, marginTop: 16, position: 'absolute', zIndex: 1 }}>
                    <Image source={require('../../assets/icons/back.png')} style={{ width: 30, height: 30, marginEnd: 8 }} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.appBarTitle}>The King’s Man</Text>
                    <Text style={styles.appBarSubtitle}>In Theaters December 22, 2021</Text>
                </View>
            </View>
            <Text style={[globalStyles.title, { marginStart: 16, marginTop: 94 }]}>Date</Text>
            <View style={{ flexDirection: 'row', marginStart: 16 }}>{
                dates.map((date, index) => (
                    <Chip
                        key={index}
                        text={date}
                        selected={index === 0}
                        onPress={() => {
                            console.log(`Selected date: ${date}`);
                        }}
                    />

                ))
            }
            </View>
            <View style={{ flex: 1, marginTop: 16, marginStart: 0, marginEnd: 16 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
                    <StaticTheatreCard arrangement={arrangements[0]} time='12:30' name='Screen 1' price='Range Starts from 30 to 95'
                        onPress={(arrangements, name) => {
                            onScreenSelected(arrangements, name);
                        }} />
                    <StaticTheatreCard arrangement={arrangements[1]} time='5:30' name='Screen 2' price='Range Starts from 30 to 95'
                        onPress={
                            (arrangements, name) => {
                                onScreenSelected(arrangements, name);
                            }
                        } />
                </ScrollView>
            </View>

        </View>
    );

}

const Chip = ({ text, selected, onPress }: { text: string; selected: boolean; onPress: () => void }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: selected ? '#61C3F2' : '#A6A6A6',
                borderRadius: 10,
                paddingVertical: 4,
                paddingHorizontal: 8,
                marginHorizontal: 4,
                height: 32,
                alignContent: 'center',
            }}
        >
            <Text
                style={{
                    color: selected ? '#FFFFFF' : '#202C43',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 12,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: 22,
                    alignItems: 'center',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const StaticTheatreCard = ({ arrangement, time, name, price, onPress }: { arrangement: number[][], time: string, name: string, price: string, onPress: (arrangement: number[][], name: string) => void }) => {
    return (
        <Pressable style={styles.theatreCardContainer} onPress={() => onPress(arrangement, name)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[globalStyles.title]}>{time}</Text>
                <Text style={[globalStyles.title, { color: '#8F8F8F', marginStart: 4 }]}>{name}</Text>
            </View>
            <TheatreScreen
                theatreId={name}
                seatingArrangement={arrangement}
                onPress={() => { }}
                readOnlyMode={true}
            />
            <Text style={[globalStyles.text, { color: '#8F8F8F', marginTop: 8 }]}>{price}</Text>
        </Pressable>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    appBar: {
        height: 76,
        fontSize: 24,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E7EC',
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    appBarTitle: {
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        color: '#202C43',
    },
    appBarSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: '#61C3F2',
        textAlign: 'center',
    },
    theatreCardContainer: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        height: 280
    }
});
