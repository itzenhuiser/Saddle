import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);


  const { login, logout } = useAuth();


  const handleLogin = async () => {
    setLoginFailed(false);
    try {
      // Replace 'http://localhost:3000' with the actual IP address of your server
      // When running on an actual device, 'localhost' will not work
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();

      if (response.status === 200) {
        console.log('Logging in');
        login({ username: username });
        console.log('Navigating to Home');
        navigation.navigate('Home');

      } else {
        // If the server responds with a status other than 200, assume login failed
        Alert.alert('Failure', 'Login failed: ' + data);
        setLoginFailed(true); // Step 2: Update loginFailed state on failure


      }
    } catch (error) {
      // Handle network error
      Alert.alert('Network error', 'Could not connect to the server');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {loginFailed && ( // Step 3: Conditionally render the error message
        <Text style={styles.errorMessage}>Invalid credentials</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  errorMessage: { // Style for the error message
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
