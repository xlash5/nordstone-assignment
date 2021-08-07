import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircleImage from '../components/CircleImage';
import { Palette } from '../theme/Colors';

const Splash = () => {


    return (
        <View style={styles.screen}>
            <CircleImage
                imageSource={require('../assets/Cat.jpeg')}
                size={250}
            />
            <Text style={styles.text}>WELCOME</Text>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Palette.primary,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Palette.black,
        marginTop: 25.0,
    }
});
