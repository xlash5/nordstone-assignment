import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CircleImage = ({ imageSource, size }) => {
    return (
        <View>
            <Image
                source={imageSource}
                style={[styles.image, { height: size, width: size, borderRadius: size / 2 }]} />
        </View>
    )
}

export default CircleImage;

const styles = StyleSheet.create({
    image: {
        overflow: 'hidden',
    },
});
