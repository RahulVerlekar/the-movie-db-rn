import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TheatreScreenProps {
    theatreId: string;
    readOnlyMode: boolean;
    seatingArrangement: number[][];
    onPress?: (i: number, j: number) => void;
}

export const TheatreScreen = ({ theatreId, onPress, readOnlyMode, seatingArrangement }: TheatreScreenProps) => {
    const [scalingFactor, setScalingFactor] = useState(readOnlyMode ? 0.75 : 1);
    const imageWidth = 10 * scalingFactor;
    const imageHeight = 10 * scalingFactor;
    const margin = scalingFactor > 1 ? 6 : 3;

    const renderEmptySeat = () => {
        return (
            <View
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    margin: margin,
                }}
            />
        );
    };

    useEffect(() => {}, [readOnlyMode]);

    const hideSeat = (i: number, j: number) => {
        if (i === 3 || i === 16) {
            return true;
        }
        if (i === 0 && j < 5) {
            return true;
        }
        if (i === 1 && j < 4) {
            return true;
        }
        return false;
    };

    function getSeatColor(i: number, j: number) {
        Alert.alert(`Seat Color`, `Row: ${i}, Column: ${j}`);
        onPress && onPress(i, j);
    }

    return (
        <View style={readOnlyMode ? styles.containerReadOnly : styles.containerNoReadOnly}>
            <Image
                source={require('../../assets/icons/screen.png')}
                style={{
                    width: 327 * scalingFactor,
                    height: 36 * scalingFactor,
                    alignSelf: 'center',
                }}
            />
            <View style={{ flex: 1, padding: 4, flexDirection: 'row', alignContent: 'center' }}>
                {!readOnlyMode && (
                    <View>
                        {seatingArrangement[0].map((data, index) => (
                            <Text
                                key={index}
                                style={{
                                    width: imageWidth,
                                    height: imageHeight,
                                    margin: margin,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize: 9 * scalingFactor,
                                }}
                            >
                                {index}
                            </Text>
                        ))}
                    </View>
                )}
                <ScrollView horizontal style={{ borderWidth: 0, width: '100%', marginEnd: 0 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 0, borderColor: 'black' }}>
                        {seatingArrangement.map((arrangement, index) => (
                            <View key={index} style={{ flexDirection: 'column', borderWidth: 0 }}>
                                {arrangement.map((seat, seatIndex) => (
                                    <View key={seatIndex}>
                                        {hideSeat(index, seatIndex) ? (
                                            renderEmptySeat()
                                        ) : (
                                            <TouchableOpacity onPress={() => getSeatColor(index, seatIndex)}>
                                                <Image
                                                    source={require('../../assets/icons/seat.png')}
                                                    style={{
                                                        width: imageWidth,
                                                        height: imageHeight,
                                                        margin: margin,
                                                        tintColor:
                                                            seat === 1
                                                                ? '#61C3F2'
                                                                : seat === 2
                                                                ? '#CD9D0F'
                                                                : seat === 3
                                                                ? '#564CA3'
                                                                : seat === 4
                                                                ? 'blue'
                                                                : '#A6A6A6',
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            {!readOnlyMode && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10, height: 32, width: 32, backgroundColor: 'white', borderRadius: 16 }}
                        onPress={() => setScalingFactor((prev) => Math.max(0.1, prev - 0.05))}
                    >
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10, height: 32, width: 32, backgroundColor: 'white', borderRadius: 16 }}
                        onPress={() => setScalingFactor((prev) => prev + 0.05)}
                    >
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerReadOnly: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 4,
        flexDirection: 'column',
        alignContent: 'center',
        borderColor: '#61C3F2',
        borderWidth: 0,
        borderRadius: 10,
    },
    containerNoReadOnly: {
        padding: 4,
        flexDirection: 'column',
        alignContent: 'center',
        height: 350,
    },
});