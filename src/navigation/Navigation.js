import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '../theme/Colors';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Notification from '../screens/autharized/Notification';
import Calculator from '../screens/autharized/Calculator';
import Images from '../screens/autharized/Images';
import Message from '../screens/autharized/Message';
import ResetPassword from '../screens/ResetPassword';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const defaultHeaderOptions = { headerStyle: { backgroundColor: Palette.secondary } };

const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="Home"
                    component={Home}
                    options={defaultHeaderOptions}
                />
                <AuthStack.Screen
                    name="Sign Up"
                    component={SignUp}
                    options={defaultHeaderOptions}
                />
                <AuthStack.Screen
                    name="Reset Password"
                    component={ResetPassword}
                    options={defaultHeaderOptions}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}

const Tab = createBottomTabNavigator();

const defaultTabAppbarOptions = {
    headerRight: () => (
        <View style={{ marginRight: 10.0 }}>
            <Button
                onPress={() => { auth().signOut().catch(e => { console.log(e) }) }}
                title="LOG OUT"
                raised
                buttonStyle={{ backgroundColor: Palette.activeTab }}
                titleStyle={{ color: Palette.dark, fontWeight: '700' }}
            >
                LOG OUT
            </Button>
        </View>
    ),
    headerStyle: { backgroundColor: Palette.secondary }
};

function HomeStackScreen() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Notification') {
                        iconName = 'bell';
                    } else if (route.name === 'Images') {
                        iconName = 'image';
                    } else if (route.name === 'Message') {
                        iconName = 'envelope';
                    } else if (route.name === 'Calculator') {
                        iconName = 'calculator';
                    }

                    return <Icon name={iconName} size={24} color={Palette.dark} />;
                },
                tabBarActiveTintColor: Palette.darkBlue,
                tabBarActiveBackgroundColor: Palette.activeTab,
                tabBarInactiveTintColor: Palette.dark,
                tabBarInactiveBackgroundColor: Palette.secondary,
            })}>
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={defaultTabAppbarOptions}
                />
                <Tab.Screen
                    name="Images"
                    component={Images}
                    options={defaultTabAppbarOptions}
                />
                <Tab.Screen
                    name="Message"
                    component={Message}
                    options={defaultTabAppbarOptions}
                />
                <Tab.Screen
                    name="Calculator"
                    component={Calculator}
                    options={defaultTabAppbarOptions}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}



const Navigation = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, [auth()])

    useEffect(() => {
        setTimeout(() => {
            setShowSplash(false);
        }, 2000)
    }, []);

    if (showSplash) {
        return <Splash />
    }

    if (!loggedIn) {
        return <AuthStackScreen />
    }

    return <HomeStackScreen />;
}

export default Navigation;

const styles = StyleSheet.create({});