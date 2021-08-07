import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { boldTextStyle, smallBoldText } from '../../theme/Constants';
import { Input, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Palette } from '../../theme/Colors';
import MessageBubble from '../../components/MessageBubble';


const Message = () => {
    const [message, setMessage] = useState('');

    const scrollViewRef = useRef();

    const messagesRef = firestore().collection('users').doc(auth().currentUser.uid).collection('messages');
    const query = messagesRef.orderBy('time');

    const [messages] = useCollectionData(query, { idField: 'id' });

    const sendMessage = async () => {
        if (message) {
            await firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('messages')
                .add({
                    uid: auth().currentUser.uid,
                    message: message,
                    time: Date.now(),
                })
                .then(() => {
                    console.log('Message send!');
                });

            setMessage('');
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                <View style={styles.messageContainer}>
                    {messages && messages.map((message) => {
                        return <MessageBubble key={message.id} message={message.message} time={message.time} />
                    })}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <Input
                    value={message}
                    placeholder='Type your message'
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color={Palette.black}
                        />
                    }
                    onChangeText={e => setMessage(e)}
                    containerStyle={styles.input}
                />
                <Button
                    raised
                    onPress={sendMessage}
                    icon={
                        <Icon
                            name="paper-plane"
                            size={25}
                            color="white"
                        />
                    }
                    containerStyle={styles.sendButton}
                    disabled={!(/\S/.test(message))}
                    disabledStyle={{ backgroundColor: Palette.dark }}
                />
            </View>
        </View>
    );
}

export default Message;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Palette.primary,
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '75%',
    },
    sendButton: {
        width: '21%',
        marginBottom: 20.0,
    },

})
