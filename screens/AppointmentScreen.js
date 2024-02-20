import { View, Text, StyleSheet } from "react-native";

const AppointmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Appointment Screen</Text>
    </View>
  );
};

export default AppointmentScreen;

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
