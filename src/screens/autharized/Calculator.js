import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { defaultScreen } from '../../theme/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Palette } from '../../theme/Colors';
import { Input, Button } from 'react-native-elements';
import functions from '@react-native-firebase/functions';

const Calculator = () => {
    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const addition = () => {
        const call = functions()
            .httpsCallable('addition');

        call({ firstNum: parseInt(firstNum, 10), secondNum: parseInt(secondNum, 10) }).then(result => {
            console.log(result.data.result);
            setResult(result.data.result);
        }).catch(e => { console.log(e) });
    }

    const division = () => {
        const call = functions()
            .httpsCallable('division');

        call({ firstNum: parseInt(firstNum, 10), secondNum: parseInt(secondNum, 10) }).then(result => {
            console.log(result.data.result);
            setResult(result.data.result);
        }).catch(e => { console.log(e) });
    }

    const multiplication = () => {
        const call = functions()
            .httpsCallable('multiplication');

        call({ firstNum: parseInt(firstNum, 10), secondNum: parseInt(secondNum, 10) }).then(result => {
            console.log(result.data.result);
            setResult(result.data.result);
        }).catch(e => { console.log(e) });
    }

    const subtraction = () => {
        const call = functions()
            .httpsCallable('subtraction');

        call({ firstNum: parseInt(firstNum, 10), secondNum: parseInt(secondNum, 10) }).then(result => {
            console.log(result.data.result);
            setResult(result.data.result);
        }).catch(e => { console.log(e) });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.numbersRow}>
                <Input
                    placeholder='Num 1'
                    containerStyle={styles.input}
                    value={firstNum}
                    onChangeText={e => { setFirstNum(e.replace(/\s/g, '')) }}
                    keyboardType={'number-pad'}
                />
                <Input
                    placeholder='Num 2'
                    containerStyle={styles.input}
                    value={secondNum}
                    onChangeText={e => { setSecondNum(e.replace(/\s/g, '')) }}
                    keyboardType={'number-pad'}
                />
            </View>
            <Text style={styles.result}>Result: {result && result.toFixed(2)}</Text>
            <View style={styles.numbersRow}>
                <Button
                    title="-"
                    raised
                    containerStyle={styles.button}
                    onPress={subtraction}
                    disabled={firstNum == '' || secondNum == ''}
                    disabledStyle={{ backgroundColor: Palette.dark }}
                />
                <Button
                    title="+"
                    raised
                    containerStyle={styles.button}
                    onPress={addition}
                    disabled={firstNum == '' || secondNum == ''}
                    disabledStyle={{ backgroundColor: Palette.dark }}
                />
                <Button
                    title="/"
                    raised
                    containerStyle={styles.button}
                    onPress={division}
                    disabled={(firstNum == '' || secondNum == '') || (secondNum == 0)}
                    disabledStyle={{ backgroundColor: Palette.dark }}
                />
                <Button
                    title="*"
                    raised
                    containerStyle={styles.button}
                    onPress={multiplication}
                    disabled={firstNum == '' || secondNum == ''}
                    disabledStyle={{ backgroundColor: Palette.dark }}
                />
            </View>
        </View>
    );
}

export default Calculator;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Palette.primary,
    },
    numbersRow: {
        marginHorizontal: 60.0,
        marginTop: 40.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    result: {
        backgroundColor: Palette.secondary,
        padding: 5.0,
        borderRadius: 5.0,
        fontSize: 18.0,
        fontWeight: '700',
        textAlign: 'center',
        marginHorizontal: '20%',
    },
    input: {
        width: '40%',
    },
    button: {
        width: '40%',
        marginHorizontal: '5%',
        marginVertical: 5.0,
    }
});
