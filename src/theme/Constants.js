import { StyleSheet, Text, View } from 'react-native';
import { Palette } from './Colors';


const styles = StyleSheet.create({
    boldText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Palette.black,
    },
    defaultScreen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Palette.primary,
    },
    smallBoldText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Palette.black,
    }
});

export const boldTextStyle = styles.boldText;
export const defaultScreen = styles.defaultScreen;
export const smallBoldText = styles.smallText;