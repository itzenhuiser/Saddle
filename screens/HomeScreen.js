import React, { useEffect, useState } from 'react';
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import ItemsTable from './Items';
import CartDisplay from './CartDisplay';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  
  const [cart, updateCart] = useState({});
  const [cartPrice, updateCartPrice] = useState(0.0); 

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

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
    // navigation.navigate('Payment', { cartPrice: cartPrice });
  }, [navigation, user, logout]); // Re-run when user or logout changes
  
  return (
    <View style={styles.wrap}>
      <View style={{ flex: 0.75 }}> {/* 75% width for ItemsTable */}
        <ItemsTable cart={cart} cartPrice={cartPrice} updateCartPrice={updateCartPrice} updateCart={updateCart}/>
      </View>
      <View style={{ flex: 0.25 }}> {/* 25% width for CartDisplay */}
        <CartDisplay cart={cart} cartPrice={cartPrice} updateCartPrice={updateCartPrice} updateCart={updateCart}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingBottom: 0,
  },
  searchBarInputContainer: {
    backgroundColor: "black",
    borderRadius: 10,
  },
  searchBarInput: {
    color: "white",
  },
  wrap: {
    padding: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "white"
  },
  item: {
    width: 30,
    height: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "grey",
    resizeMode: "contain",
  },
});

export default HomeScreen;
