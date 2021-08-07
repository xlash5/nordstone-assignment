import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { Palette } from '../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { boldTextStyle, defaultScreen, smallBoldText } from '../theme/Constants';
import { Input, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        if (mail && password) {
            auth().signInWithEmailAndPassword(mail, password)
                .then((data) => {
                    console.log(data.user);
                })
                .catch((e) => {
                    console.log(e);
                    ToastAndroid.show("Uset Not Found !",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                });
        } else {
            ToastAndroid.show("Uset Not Found !",
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
            <Button
                title="LOGIN"
                raised
                onPress={signIn}
            />
            <Text
                style={[smallBoldText, styles.text]}>
                If you don't have account you can create new one by pressing
                <Text
                    onPress={() => { navigation.navigate('Sign Up') }}
                    style={[smallBoldText, { color: Palette.red }]}
                > here</Text>
            </Text >
            <Text
                style={[smallBoldText, styles.text]}>
                Click
                <Text
                    onPress={() => { navigation.navigate('Reset Password') }}
                    style={[smallBoldText, { color: Palette.red }]}
                > here </Text>
                if you forgot your password.
            </Text >
        </View >
    );
};

export default Home;

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 50.0
    },
    text: {
        marginTop: 10.0,
    }
});
