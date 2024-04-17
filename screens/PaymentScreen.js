import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Linking, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const POINTS_THRESHOLD = 100;
  const REWARD_AMOUNT = 5;
  const { cart, cartPrice } = route.params || { cartPrice: 0.0, cart: {} };
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [showCreateAccountForm, setShowCreateAccountForm] = React.useState(false);
  const [totalDue, setTotalDue] = React.useState(cartPrice);

  const [userDetails, setUserDetails] = React.useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });


  const handleCashPayment = () => {
    navigation.navigate('CashPayment', { totalDue: totalDue });
  };

  const handleCreditPayment = () => {
    navigation.navigate('Home', { totalDue: totalDue });
    Linking.openURL('http://localhost:3000/card');
  };

  const handleRewardsSubmission = async () => {
    console.log(phoneNumber);
    try {
      const response = await fetch('http://localhost:3001/updatePoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          totalDue: totalDue,
        }),
      });
      
      const json = await response.json();
      
      if (response.status === 404) {
        // If phone number not found, ask user if they want to create an account
        const createAccount = confirm(json.message + " Would you like to create an account?" + userDetails.phoneNumber);
        if (createAccount) {
          // Prompt for more details to create an account
          const firstName = prompt("Enter your first name:");
          const lastName = prompt("Enter your last name:");
          const phoneNumber = prompt("Enter your phone number:");

          if (firstName && lastName && phoneNumber) {
            createUserAccount({ firstName, lastName, phoneNumber });
          }
        }
      } else if (response.status === 200) {
        // Handle successful points update
        console.log('Submission successful:', json);
        alert(`Points updated! Your new points total is ${json.newPoints}`);
        if (json.newPoints >= POINTS_THRESHOLD) {
          const redeemPoints = confirm('You have enough points to redeem $5 off your purchase. Would you like to redeem your points now?');
          if (redeemPoints) {
            handlePointsRedemption();
          }
        }
      } else {
        // Handle other potential errors
        console.error('An error occurred:', json.message);
      }
    } catch (error) {
      console.error('Error submitting rewards:', error);
    }
  };

  const createUserAccount = async (userDetails) => {
    try {
      const response = await fetch('http://localhost:3001/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
  
      if (response.ok) {
        const json = await response.json();
        // Provide some user feedback
        alert(`Account created successfully! Welcome, ${json.firstName}!`);
        // Perform additional actions upon successful account creation if necessary
      } else {
        // Provide some user feedback
        alert('Failed to create an account. Please try again later.');
      }
    } catch (error) {
      // Provide some user feedback
      console.error('Error creating an account:', error);
      alert('An error occurred while creating the account.');
    }
  };
  

  const handleCreateAccountPress = () => {
    setShowCreateAccountForm(true); // This will display the create account form
  };

  const handleCreateAccountSubmit = async () => {
    const userDetails = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    await createUserAccount(userDetails);
  
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setShowCreateAccountForm(false);
  };

  const handlePointsRedemption = async () => {
  
    try {
      const response = await fetch('http://localhost:3001/redeemPoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          pointsToRedeem: POINTS_THRESHOLD,
        }),
      });
      
      const json = await response.json();
      
      if (response.ok) {
        const newTotal = totalDue - REWARD_AMOUNT;
        setTotalDue(newTotal); // Update state instead of the variable
        alert(`You've used 100 points to get $5 off! Your new total is: $${newTotal.toFixed(2)}`);
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.error('Error redeeming points:', error);
    }
  };
  

return (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Text style={styles.title}>Finish & Pay</Text>
    <View style={styles.receiptContainer}>
      {Object.keys(cart).map((itemName) => (
        <View key={itemName} style={styles.itemRow}>
          <Text style={styles.itemDetails}>{itemName}</Text>
          <Text style={styles.itemDetails}>Qty: {cart[itemName].quantity}</Text>
          <Text style={styles.itemDetails}>@ ${cart[itemName].price} ea.</Text>
        </View>
      ))}
    </View>
    <Text style={styles.totalDue}>Total Due: ${totalDue.toFixed(2)}</Text>
    <Text style={styles.label}>Rewards?</Text>
    <View style={styles.phoneNumberContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleRewardsSubmission}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    {!showCreateAccountForm && (
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleCreateAccountPress}
      >
        <Text style={styles.submitButtonText}>Want to Join Rewards?</Text>
      </TouchableOpacity>
    )}
    {showCreateAccountForm && (
      <View style={styles.createAccountSection}>
        <TextInput
          style={styles.createAccountInput}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Enter phone number"
          placeholderTextColor="#b1b1b1"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.createAccountInput}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="Enter first name"
          placeholderTextColor="#b1b1b1"
        />
        <TextInput
          style={styles.createAccountInput}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Enter last name"
          placeholderTextColor="#b1b1b1"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleCreateAccountSubmit}
        >
          <Text style={styles.submitButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    )}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleCashPayment}>
        <Text style={styles.buttonText}>Cash</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreditPayment}>
        <Text style={styles.buttonText}>Credit</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 50, // If you want padding inside the scroll view
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  receiptContainer: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemDetails: {
    color: 'white',
    fontSize: 16,
  },
  totalDue: {
    color: '#4CAF50',
    fontSize: 24,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: 'white',
    backgroundColor: '#262626',
    width: '75%', // Adjust width as needed, make sure it adds up to 100% with the button's width
    marginRight: '5%', // Add some margin to separate the input from the button
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align children to the start of the container
    alignItems: 'center',
    width: '90%', // Match the width with other containers like receiptContainer for alignment
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '20%', // This width plus the input width should add up to less than 100% considering the margin
    margin:10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#262626',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
  createAccountSection: {
    borderColor: '#4CAF50', // Adjust the color as needed
    borderWidth: 2,
    borderRadius: 5,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20, // Add spacing at the bottom as well
  },
  
  // Style for the new phone number input inside the create account section
  createAccountInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: 'white',
    backgroundColor: '#262626',
    width: '100%',
    marginBottom: 10,
  },
});

export default PaymentScreen;
