import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '../theme/Colors';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MessageBubble = ({ message, time }) => {
    const getDate = (time) => {
        let timeData = new Date();
        timeData.setTime(time);

        return days[timeData.getDay()] + ' ' + timeData.getHours() + ':' + timeData.getMinutes() + ':' + timeData.getSeconds();
    }
    return (
        <View style={styles.message} >
            <Text style={styles.messageText}>{message}</Text>
            <Text style={styles.timeText}>{getDate(time)}</Text>
        </View>
    );
}

export default MessageBubble;

const styles = StyleSheet.create({
    message: {
        alignSelf: 'flex-end',
        marginTop: 10.0,
        marginHorizontal: 10.0,
        padding: 15.0,
        backgroundColor: Palette.secondary,
        borderRadius: 15,
    },
    messageText: {
        fontSize: 18.0,
        fontWeight: '700',
        color: Palette.black,
        alignSelf: 'flex-start',
    },
    timeText: {
        alignSelf: 'flex-end',
        color: Palette.dark,
    }
});
