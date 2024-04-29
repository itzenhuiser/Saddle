import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);


  const { login, logout } = useAuth();


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        //const response = await fetch('http://192.168.68.134:3001/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        setLoginFailed(false);
        console.log('Logging in');
        login({ username: username });
        console.log('Navigating to Home');
        navigation.navigate('Home');
      } else {
        console.log('failed logging in');
        setLoginFailed(true);
      }
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Network error', 'Could not connect to the server');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saddle</Text>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Username:</Text>
      </View>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Password:</Text>
      </View>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loginFailed && (
        <Text style={styles.errorMessage}>Invalid credentials</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 40, // You can adjust the size as needed
    fontWeight: 'bold', // This makes the text bold
    marginBottom: 40, // Add some space below the title
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  textContainer: {
    alignSelf: 'stretch',
    marginLeft: '10%',
    marginRight: '10%', // added for right alignment
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    color: 'white',
    width: '80%', // Width of input fields
    fontSize: 18, // Optional: to match the size of the label
    padding: 10,
  },
  errorMessage: {
    color: '#ff3b30', // iOS-style error color
    fontSize: 14,
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    borderRadius: 25, // rounded corners for the button
    padding: 10,
    backgroundColor: '#1e90ff', // a blue color for the button
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // slight elevation for the button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '80%', // Match width with input fields
    color: 'white',
  },
});

export default LoginScreen;
