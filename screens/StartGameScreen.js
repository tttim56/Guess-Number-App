import React, {useState} from 'react';
import {View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberinputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                'Invalid Input!',
                'Number has to be a number between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        //console.log(chosenNumber);
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOuput;
    if (confirmed){
        //console.log(selectedNumber);
        confirmedOuput = (
            <Card style={styles.summaryContainer} >
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} >
            <View style={styles.screen}>
            <Text style={styles.title} >Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={2}
                    onChangeText={numberinputHandler}
                    value={enteredValue} 
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                    </View>
                    <View style={styles.button}>
                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                    </View>
                </View>
            </Card>
            {confirmedOuput}
         </View>
        </TouchableWithoutFeedback>
        
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input:{
        width: 50,
        textAlign: 'center'
    },
    summaryContainer:{
        marginTop: 10,
        alignItems: 'center'
    }
});
export default StartGameScreen;