import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

interface TheatreScreenProps {
    theatreId: string;
    showScaleButton?: boolean;
    readOnlyMode?: boolean;
    seatingArrangement: number[][]
    onPress?: (i: number, j: number) => void;
}

export const TheatreScreen = ({ theatreId, onPress, showScaleButton: readOnlyMode = false, seatingArrangement }: TheatreScreenProps) => {


    const [scalingFactor, setScalingFactor] = useState(1) // Adjust this value to scale the image size
    const imageWidth = 10 * scalingFactor; // Adjust the width of the image
    const imageHeight = 10 * scalingFactor; // Adjust the height of the image
    const margin = scalingFactor > 1 ? 6 : 3; // Adjust the margin between images


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

    useEffect(() => {
        if (readOnlyMode) {
            setScalingFactor(0.25);
        } else {
            setScalingFactor(1);
        }
    }, [readOnlyMode])

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
    }

    function getSeatColor(i: number, j: number) {
        Alert.alert(`Seat Color`, `Row: ${i}, Column: ${j}`);
        onPress && onPress(i, j);
    }

    return (
        <View style={{ flex: 1, backgroundColor: readOnlyMode ? '#EFEFEF' : "#fff", padding: 4, flexDirection: 'column', alignContent: 'center', borderColor: '#61C3F2', borderWidth: readOnlyMode==true ? 1 : 0, borderRadius: 10 }}>
            <Image
                source={require('../../assets/icons/screen.png')}
                style={{
                    width: 327 * scalingFactor,
                    height: 36 * scalingFactor,
                    alignSelf: 'center',
                }} />
            <View style={{ flex: 1, padding: 4, flexDirection: 'row', alignContent: 'center' }}>
                {
                    readOnlyMode && (
                        <View>
                            {seatingArrangement[0].map((data, index) => (
                                <Text
                                    style={{
                                        width: imageWidth,
                                        height: imageHeight,
                                        margin: margin,
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        fontSize: 9 * scalingFactor,
                                    }}>{index}</Text>
                            ))}
                        </View>
                    )
                }
                <ScrollView horizontal style={{ borderWidth: 0, width: '100%', marginEnd: 0 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 0, borderColor: 'black' }}>
                        {seatingArrangement.map((arrangement, index) => (
                            <View key={index} style={{ flexDirection: 'column', borderWidth: 0 }}>
                                {
                                    arrangement.map((seat, seatIndex) => (
                                        <View key={seatIndex} style={{}}>{
                                            (hideSeat(index, seatIndex)) ? renderEmptySeat() : (
                                                <TouchableOpacity onPress={() => getSeatColor(index, seatIndex)}>
                                                    <Image
                                                        source={require('../../assets/icons/seat.png')}
                                                        style={{
                                                            width: imageWidth,
                                                            height: imageHeight,
                                                            margin: margin,
                                                            tintColor: seat === 1 ? '#61C3F2' : seat === 2 ? '#CD9D0F' : seat === 3 ? '#564CA3' : seat === 4 ? 'blue' : '#A6A6A6',
                                                        }} />
                                                </TouchableOpacity>
                                            )
                                        }
                                        </View>
                                    ))
                                }
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            {
                readOnlyMode && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginHorizontal: 10, padding: 10, backgroundColor: 'white', borderRadius: 50 }}
                            onPress={() => setScalingFactor(prev => Math.max(0.1, prev - 0.05))}
                        >
                            <Text style={{ fontSize: 20 }}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 10, padding: 10, backgroundColor: 'white', borderRadius: 50 }}
                            onPress={() => setScalingFactor(prev => prev + 0.05)}
                        >
                            <Text style={{ fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
};