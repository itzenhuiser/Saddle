import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import axios from 'axios';



const CashPaymentScreen = ({ route, navigation }) => {
  const [amountGiven, setAmountGiven] = useState('');
  const [changeDue, setChangeDue] = useState('');
  const [showDigitalChangeButton, setShowDigitalChangeButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Assuming the total amount due is passed from the previous screen
  const { totalDue } = route.params;

  const handleCalculateChange = () => {
    const change = parseFloat(amountGiven) - totalDue;
    if (change >= 0) {
      setChangeDue(`Change owed: $${change.toFixed(2)}`);
      setShowDigitalChangeButton(true);

      Keyboard.dismiss();
    } else {
      alert('The amount given is less than the total due. Please enter a valid amount.');
      setShowDigitalChangeButton(false);
      setChangeDue('');
    }
  };

  const handleDigitalChangeReturn = async () => {
    const numericChangeDue = changeDue.replace(/[^\d.]/g, '');
    const changeDueInCents = parseFloat(numericChangeDue) * 100;    console.log(changeDue)
    console.log(changeDueInCents);

    if (phoneNumber.length === 10) { // Basic validation for US phone numbers
      // Define the request data
      const requestData = {
        delivery: {
          message: 'March 26th'
        },
        amount: changeDueInCents,
        payee: {
          country_code: '1',
          phone_number: phoneNumber
        }
      };

      // Define the request headers
      const headers = {
        'Content-Type': 'application/json'
      };

      // Define the request config with basic authentication
      const config = {
        auth: {
          username: 'pk_dev_KOhMvTvHfPNEVlJ7wVrz2KTZ60tbo',
          password: 'sk_dev_XUsf0zHk5i45bcK3y8Zt7Igm6UKVs'
        },
        headers: headers
      };

      try {
        const response = await axios.post('https://pls.senddotssandbox.com/api/v2/payouts/send-payout', requestData, config);
        console.log('Response:', response.data);
        console.log('Success', 'Digital change sent successfully.');
      } catch (error) {
        console.error('Error:', error?.response?.data || error);
        console.error('Error', 'There was an issue sending digital change.');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
    }
    navigation.dispatch(
      CommonActions.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  );
  };


  const handleDone = () => {
    setAmountGiven('');
    setChangeDue('');
    setShowDigitalChangeButton(false);
  
    navigation.dispatch(
        CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Saddle</Text>
      </View>
      <Text style={styles.prompt}>Enter Amount Given</Text>
      <TextInput 
        style={styles.input} 
        value={amountGiven} 
        onChangeText={setAmountGiven} 
        keyboardType="numeric" 
        placeholder="Amount given"
        placeholderTextColor="#808080"
      />
      <TouchableOpacity style={styles.button} onPress={handleCalculateChange}>
        <Text style={styles.buttonText}>Calculate Change</Text>
      </TouchableOpacity>
      {changeDue ? <Text style={styles.changeDueText}>{changeDue}</Text> : null}
      {showDigitalChangeButton && (
        <>
          <TextInput 
            style={[styles.input, {marginTop: 20}]} // Add marginTop for spacing
            value={phoneNumber} 
            onChangeText={setPhoneNumber} 
            keyboardType="phone-pad" 
            placeholder="Enter Phone Number"
            placeholderTextColor="#808080"
          />
          <TouchableOpacity style={[styles.button1, {marginTop: 20}]} onPress={handleDigitalChangeReturn}>
            <Text style={styles.buttonText}>Send Digital Change</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={[styles.button, styles.doneButton]} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  prompt: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    fontSize: 18,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20, // Add spacing above the button
  },
  doneButton: {
    backgroundColor: '#4CAF50', // A green color for the done button (change as needed)
    marginTop: 20, // Add some space between the done button and the other elements
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  changeDueText: {
    color: 'white',
    fontSize: 22,
    marginTop: 20,
  },
});

export default CashPaymentScreen;
