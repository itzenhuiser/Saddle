import { View, Text, StyleSheet } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
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
});
