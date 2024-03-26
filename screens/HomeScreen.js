
import React, { useEffect, useState } from 'react';
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import { SearchBar } from "react-native-elements";


const width = Dimensions.get("window").width;  
  
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  
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
  }, [navigation, user, logout]); // Re-run when user or logout changes
  
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholderTextColor="white"
      />
      <View style={styles.wrap}>
        {filteredImages.map((item) => (
          <Image source={item.loc} style={styles.item} />
        ))}
      </View>
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
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "grey",
    resizeMode: "contain",
  },
});

export default HomeScreen;
