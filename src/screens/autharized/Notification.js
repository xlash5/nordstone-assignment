import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
            <Text>NOTIFICATION</Text>
            <Button
                title="SEND NOTIFICATION"
                raised
                onPress={showNotification}
            />
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({})
