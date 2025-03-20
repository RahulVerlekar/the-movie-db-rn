import { StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";

type ToolbarProps = {
    title: string;
    icon?: ReactNode;
};

const Toolbar = ({ title, icon }: ToolbarProps) => {
    return (
        <View style={style.container} >
            <Text style={style.title}>
                {title}
            </Text>
            <View style={style.iconContainer}>
                {icon}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        height: 68,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
    },
    iconContainer: {
        marginLeft: 8,
    },
});

export default Toolbar;