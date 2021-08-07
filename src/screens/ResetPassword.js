import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Palette } from '../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { defaultScreen } from '../theme/Constants';
import { Input, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const ResetPassword = () => {
    const [mail, setMail] = useState('');

    const sendResetReq = () => {
        if (mail) {
            auth().sendPasswordResetEmail(mail)
                .then(e => { console.log(e) })
                .catch(e => { console.log(e) });
        } else {
            ToastAndroid.show("Something Went Wrong !",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    return (
        <View style={defaultScreen}>
            <Input
                placeholder='email@gmail.com'
                value={mail}
                leftIcon={
                    <Icon
                        name='envelope'
                        size={24}
                        color={Palette.black}
                    />
                }
                label='EMAIL'
                keyboardType='email-address'
                onChangeText={e => setMail(e.replace(/\s/g, ''))}
                containerStyle={styles.input}
            />
            <Button
                title="Send Reset Request"
                raised
                onPress={sendResetReq}
            />
        </View>
    );
}

export default ResetPassword;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 50.0
    }
});
