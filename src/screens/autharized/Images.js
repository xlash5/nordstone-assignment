import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { boldTextStyle, defaultScreen, smallBoldText } from '../../theme/Constants';
import { Palette } from '../../theme/Colors';
import { Input, Button, Image } from 'react-native-elements';
import ImageContainer from '../../components/ImageContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Images = () => {
    const imagesRef = firestore().collection('users').doc(auth().currentUser.uid).collection('images');
    const query = imagesRef.orderBy('time');
    const [imagesData] = useCollectionData(query, { idField: 'id' });
    const [isFullScreen, setIsFullScreen] = useState({ isFull: false });

    const onUploadImage = () => {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(response.assets[0].uri);

                let reference = storage().ref(`/${auth().currentUser.uid}/${response.assets[0].fileName}`);
                let task = reference.putFile(response.assets[0].uri);

                task.then((t) => {
                    reference.getDownloadURL()
                        .then((url) => {
                            firestore()
                                .collection('users')
                                .doc(auth().currentUser.uid)
                                .collection('images')
                                .add({
                                    uid: auth().currentUser.uid,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    console.log('Image Added!');
                                });
                        }).catch((e) => { console.log(e) })
                }).catch((e) => console.log('uploading image error => ', e));



            }
        });
    }

    const fullScreenImage = () => {

    }

    if (isFullScreen.isFull) {
        return <View style={styles.imageBackground}>
            <Image
                source={{ uri: isFullScreen.url }}
                PlaceholderContent={<ActivityIndicator />}
                style={styles.fullScreenImage}
            />
            <Button
                raised
                onPress={() => setIsFullScreen({ isFull: false })}
                containerStyle={{ position: 'absolute', bottom: 15.0, right: 15.0 }}
                title="CLOSE"

            />
        </View>
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={{ ...defaultScreen, ...styles.screen }}>
                {
                    imagesData &&
                    imagesData.map((i) => {
                        return (
                            <TouchableOpacity key={i.id} onPress={() => setIsFullScreen({ url: i.url, isFull: true })}>
                                <ImageContainer >
                                    <Image
                                        source={{ uri: i.url }}
                                        style={styles.imageStyle}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                </ImageContainer>
                            </TouchableOpacity>
                        );
                    })
                }


                <TouchableOpacity onPress={onUploadImage}>
                    <ImageContainer>
                        <Icon
                            name='plus-circle'
                            size={Dimensions.get('window').width / 8}
                            color={Palette.dark}
                        />
                    </ImageContainer>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Images;

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Palette.primary,
    },
    screen: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10.0,
    },
    imageStyle: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
    },
    imageBackground: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: Palette.primary,
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})
