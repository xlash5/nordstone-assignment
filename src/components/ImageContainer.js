import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Palette } from '../theme/Colors';

const ImageContainer = ({ children }) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

export default ImageContainer;

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 2 - 40.0,
        height: Dimensions.get('window').width / 2 - 40.0,
        backgroundColor: Palette.secondary,
        marginLeft: 40 / 1.5,
        marginVertical: 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10.0,
    }
});
