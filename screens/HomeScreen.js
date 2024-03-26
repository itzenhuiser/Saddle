import React, { Component, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const [images, setimages] = useState([
  require("./images/drone.jpg"),
  require("./images/iphone15black.jpg"),
  require("./images/goldfish.jpg"),
  require("./images/ritz.jpg"),
  require("./images/cheezit.jpg"),
  require("./images/oreo.jpg"),
]);

export default class HomeScreen extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <TextInput
          placeholderTextColor="black"
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => searchFunction(text)}
        />
        <View style={styles.wrap}>
          <Image style={styles.item} source={require("./images/drone.jpg")} />
          <Image
            style={styles.item}
            source={require("./images/iphone15black.jpg")}
          />
          <Image
            style={styles.item}
            source={require("./images/goldfish.jpg")}
          />
          <Image style={styles.item} source={require("./images/ritz.jpg")} />
          <Image style={styles.item} source={require("./images/cheezit.jpg")} />
          <Image style={styles.item} source={require("./images/oreo.jpg")} />
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item, index }) => (
            <Image
              source={item}
              key={index}
              style={{
                width: 260,
                height: 300,
                borderWidth: 2,
                borderColor: "#d35647",
                resizeMode: "contain",
                margin: 8,
              }}
            />
          )}
        />
      </View>
    );
  }
}

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
    paddingTop: 50,
    flexDirection: "row",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    paddingBottom: 600,
  },
  item: {
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "space-evenly",
    height: 125,
    width: 125,
  },
});
