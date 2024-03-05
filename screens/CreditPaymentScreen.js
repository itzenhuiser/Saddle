// CreditPaymentScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CreditPaymentScreen = ({ route }) => {
  // You can access totalDue from route.params if needed
  const { totalDue } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Please Swipe Your Credit Card</Text>
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
  prompt: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
});

export default CreditPaymentScreen;
