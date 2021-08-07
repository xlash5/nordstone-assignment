import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Palette } from '../../theme/Colors';
import { Input, Button } from 'react-native-elements';
import { boldTextStyle, defaultScreen, smallBoldText } from '../../theme/Constants';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

const Notification = () => {
    useEffect(() => {
        PushNotification.createChannel(
            {
                channelId: "MY_CHANNEL_ID",
                channelName: "MY_CHANNEL",
                channelDescription: "Channel Desc",
                soundName: "default",
                importance: 1,
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    })

    const showNotification = () => {

        PushNotification.localNotification({
            channelId: "MY_CHANNEL_ID",
            title: "TITLE",
            message: "HELLO THERE",
        })
    };

    return (
        <View style={defaultScreen}>
            <TouchableOpacity onPress={showNotification}>
                <View style={styles.bigButton}>
                    <Text style={styles.text}>SEND NOTIFICATION</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    bigButton: {
        backgroundColor: Palette.red,
        height: 200.0,
        width: 200.0,
        borderRadius: 100.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    }
})
