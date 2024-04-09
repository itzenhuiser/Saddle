import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useAuth } from './AuthContext';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);


  const { login, logout } = useAuth();


  const handleLogin = async () => {
    try {
      // const response = await fetch('http://localhost:3001/login', {
        const response = await fetch('http://192.168.68.134:3001/login', {

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
      <View style={styles.textContainer}>
        <Text style={styles.text}>Username:</Text>
      </View>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.textContainer}>
  <     Text style={styles.text}>Password:</Text>
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
      <Button title="Login" onPress={handleLogin} />

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
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  textContainer: {
    alignSelf: 'stretch', // this will make the container take the full width available
    marginLeft: 40, // adjust the margin as needed to align the text as you like
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    color: 'white', // Ensure text is visible against the black background
    width: '80%', // Adjust based on your layout preferences
    padding: 10,
  },
  errorMessage: {
    color: 'red', // This will make the message stand out against the black background
    fontSize: 16, // Adjust the size as needed
    marginTop: 5, // Add some space above the message
    marginBottom: 10,
  },
});

export default LoginScreen;
