import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Palette } from '../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { boldTextStyle, defaultScreen, smallBoldText } from '../theme/Constants';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const createUser = () => {
        if (mail && password && repeatPassword) {
            if (password === repeatPassword) {
                if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
                    auth().createUserWithEmailAndPassword(mail, password)
                        .then((data) => {
                            console.log(data.user);
                        })
                        .catch((e) => {
                            console.log(e);
                            ToastAndroid.show("Something Went Wrong !",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        });
                } else {
                    ToastAndroid.show("Weak Password !",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }
        } else {
            ToastAndroid.show("Something Went Wrong !",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    return (
        <View style={[defaultScreen, styles.screen]}>
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
            />
            <Input
                placeholder='Password'
                value={password}
                leftIcon={
                    <Icon
                        name='key'
                        size={24}
                        color={Palette.black}
                    />
                }
                label='PASSWORD'
                secureTextEntry={true}
                onChangeText={e => setPassword(e.replace(/\s/g, ''))}
            />
            <Input
                placeholder='Password Repeat'
                value={repeatPassword}
                leftIcon={
                    <Icon
                        name='key'
                        size={24}
                        color={Palette.black}
                    />
                }
                label='REPEAT PASSWORD'
                secureTextEntry={true}
                onChangeText={e => setRepeatPassword(e.replace(/\s/g, ''))}
            />
            <Button
                title="SIGN UP"
                raised
                onPress={createUser}
            />
        </View >
    );
}

export default SignUp;

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 50.0
    },
});
