import * as React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, NavigationProp, StaticParamList, useNavigation } from '@react-navigation/native';
import { TheatreScreen } from '../../components/TheatreScreen';
import { TrendingStackParamList } from '../SearchContainer';

export default function SeatConfirmation() {

    const seatingArrangement: number[][] = Array.from({ length: (Math.floor(Math.random() * 5) + 20) }, (i) =>
        Array.from({ length: 10 }, (j) => Math.floor(Math.random() * 5) + 1)
    );
    const navigation: NavigationProp<TrendingStackParamList> = useNavigation();

    function goBack() {
        Alert.alert(`Go Back`, `Going back to the previous screen`);
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <Pressable onPress={() => { goBack() }} style={{ paddingStart: 16, paddingTop: 16, position: 'absolute' }}>
                    <Image source={require('../../assets/icons/back.png')} style={{ width: 30, height: 30, marginEnd: 8 }} />
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.appBarTitle}>The King’s Man</Text>
                    <Text style={styles.appBarSubtitle}>5th March</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginTop: 16, marginStart: 0, marginEnd: 16 }}>
                <TheatreScreen
                    theatreId=''
                    seatingArrangement={seatingArrangement}
                    onPress={() => { }}
                    readOnlyMode={false}
                />
            </View>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Image
                            source={require('../../assets/icons/seat.png')}
                            style={{
                                width: 16,
                                height: 16,
                                margin: 4,
                                tintColor: '#CD9D0F'
                            }} />
                        <Text>Selected</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/icons/seat.png')}
                            style={{
                                width: 16,
                                height: 16,
                                margin: 4,
                                tintColor: '#A6A6A6'
                            }} />
                        <Text>Not available</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/icons/seat.png')}
                            style={{
                                width: 16,
                                height: 16,
                                margin: 4,
                                tintColor: '#564CA3'
                            }} />
                        <Text>VIP (150$)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/icons/seat.png')}
                            style={{
                                width: 16,
                                height: 16,
                                marginEnd: 4,
                                tintColor: '#61C3F2'
                            }} />
                        <Text>Regular (50$)</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 24 }}>4 / 3 row</Text>
                    <TouchableOpacity onPress={() => { /* handle remove seat */ }}>
                        <Text style={{ fontSize: 24 }}>×</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 24 }}>Total Price</Text>
                    <Text style={{ fontSize: 24 }}>$ 50</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#61C3F2', padding: 16, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Proceed to pay</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        height: 310,
        margin: 10
    }
});
