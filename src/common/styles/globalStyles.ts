import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: colors.darkPurple,
    borderTopWidth: 0,
    elevation: 8,
    shadowOpacity: 0.1,
    height: 75,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  tabBarItem: {
    paddingVertical: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  tabBarIcon: {
    tintColor: "#827D88",
    width: 18,
    height: 18,
    padding: 8,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
