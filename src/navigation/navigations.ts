
import { BottomTabNavigatorProps } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SearchMovie:{}
}


export type RootNavigationProp = NavigationProp<
 StackNavigationProp<RootStackParamList>
>;