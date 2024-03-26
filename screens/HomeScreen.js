import React, { useEffect } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import ItemsTable from './Items';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Only attempt to set navigation options if the user object exists
    if (user) {
      navigation.setOptions({
        headerTitle: `Hello, ${user.username}`,
        headerRight: () => (
          <Button onPress={() => logout()} title="Logout" color="#000" /> // Adjust button color as needed
        ),
      });
    } else {
      // Default options when no user is logged in
      navigation.setOptions({
        headerTitle: 'Welcome',
        headerRight: null, // No logout button when no user is logged in
      });
    }
  }, [navigation, user, logout]); // Re-run when user or logout changes
  
  return (
    <View style={styles.wrap}>
      <ItemsTable />
      {/* <Image style={styles.item} source={require("./images/drone.jpg")} />
      <Image
        style={styles.item}
        source={require("./images/iphone15black.jpg")}
      />
      <Image style={styles.item} source={require("./images/goldfish.jpg")} />
      <Image style={styles.item} source={require("./images/ritz.jpg")} />
      <Image style={styles.item} source={require("./images/cheezit.jpg")} />
      <Image style={styles.item} source={require("./images/oreo.jpg")} /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  wrap: {
    paddingTop: 100,
    flex: 1,
    flexDirection: "row",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "black",
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-evenly",
    height: 125,
    width: 125,
  },
});
