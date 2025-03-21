import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

interface TheatreScreenProps {
    theatreId: string;
    width?: number;
    height?: number;
    onPress?: (i: number, j: number) => void;
}

export const TheatreScreen = ({ theatreId, width, height, onPress }: TheatreScreenProps) => {


    const scalingFactor = 1.25; // Adjust this value to scale the image size
    const imageWidth = 10 * scalingFactor; // Adjust the width of the image
    const imageHeight = 10 * scalingFactor; // Adjust the height of the image
    const margin = 3 * scalingFactor; // Adjust the margin between images
    const seatingArrangement: number[][] = Array.from({ length: 25 }, (i) =>
        Array.from({ length: 10 }, (j) => Math.floor(Math.random() * 5) + 1)
    );

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
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 4, flexDirection: 'column' }}>
            <View style={{ marginTop: 20 }}>
                <Text style={{ color: "black", alignSelf: 'center' }}>screen</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', padding: 4, flexDirection: 'row' }}>
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
                <ScrollView horizontal style={{ borderColor: 'green', borderWidth: 0, width: '100%', marginEnd: 0 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 0, borderColor: 'black', backgroundColor: 'white' }}>
                        {seatingArrangement.map((arrangement, index) => (
                            <View key={index} style={{ flexDirection: 'column' }}>
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
                                                            tintColor: seat === 1 ? 'green' : seat === 2 ? 'yellow' : seat === 3 ? 'red' : seat === 4 ? 'blue' : 'gray',
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 75,
        borderRadius: 12,
        backgroundColor: "blue",
    },
    curvedLine: {
        width: "20%",
        height: 100,
        position: "absolute",
        bottom: -25,
        left: "40%",
        borderRadius: 35,
        backgroundColor: "black",
        transform: [{ scaleX: 5 }, { scaleY: 1 }],
    },
});