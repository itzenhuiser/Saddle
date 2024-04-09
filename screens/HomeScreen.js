
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
  const images = [
    { id: 1, loc: require("./images/drone.jpg"), name: "drone" },
    {
      id: 2,
      loc: require("./images/iphone15black.jpg"),
      name: "iphone15black",
    },
    { id: 3, loc: require("./images/goldfish.jpg"), name: "goldfish" },
    { id: 4, loc: require("./images/ritz.jpg"), name: "ritz" },
    { id: 5, loc: require("./images/cheezit.jpg"), name: "cheezit" },
    { id: 6, loc: require("./images/oreo.jpg"), name: "oreo" },
  ];

  const updateSearch = (search) => {
    setSearch(search);
  };

  const filteredImages = search
    ? images.filter((image) =>
        image.name.toLowerCase().includes(search.toLowerCase())
      )
    : images;

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
      <ItemsTable cart={cart} cartPrice={cartPrice} updateCartPrice={updateCartPrice} updateCart={updateCart}/>
      <CartDisplay cart={cart} cartPrice={cartPrice}/>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 20,
  },
  searchBarInputContainer: {
    backgroundColor: "black",
    borderRadius: 10,
  },
  searchBarInput: {
    color: "white",
  },
  wrap: {
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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
