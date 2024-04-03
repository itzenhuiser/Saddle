import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const PaymentScreen = () => {
  const navigation = useNavigation();


  const total_due = 100;

  const handleCashPayment = () => {
    navigation.navigate('CashPayment', { totalDue: total_due });
  };

  const handleCreditPayment = () => {
    navigation.navigate('CreditPayment', { totalDue: total_due });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finish & Pay</Text>
      <Text style={styles.totalDue}>Total Due: ${total_due.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCashPayment} >
          <Text style={styles.buttonText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleCreditPayment} >
          <Text style={styles.buttonText}>Credit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 50,
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
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  totalDue: {
    color: 'white',
    fontSize: 24,
    marginVertical: 20,
    borderWidth: 1,       // Set the width of the border
    borderColor: 'white', // Set the color of the border to white
    padding: 10, 
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default PaymentScreen;
