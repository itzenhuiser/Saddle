import { View, Text, Image, StyleSheet } from "react-native";

//const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (
    <View style={styles.wrap}>
      <Image style={styles.item} source={require("./images/drone.jpg")} />
      <Image
        style={styles.item}
        source={require("./images/iphone15black.jpg")}
      />
      <Image style={styles.item} source={require("./images/goldfish.jpg")} />
      <Image style={styles.item} source={require("./images/ritz.jpg")} />
      <Image style={styles.item} source={require("./images/cheezit.jpg")} />
      <Image style={styles.item} source={require("./images/oreo.jpg")} />
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