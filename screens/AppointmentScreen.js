import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import EventCalendar from "react-native-events-calendar";
import Modal from "react-native-modal";

let { width } = Dimensions.get("window");

const AppointmentScreen = () => {
  const [events, setEvents] = useState([
    {
      start: "2024-03-26 14:15:00",
      end: "2024-03-26 14:30:00",
      title: "Mid-Semester Presentation",
      summary: "Zoom meeting w professors",
    },
    {
      start: "2024-03-26 15:30:00",
      end: "2024-03-26 17:20:00",
      title: "Class",
      summary: "Elements of 3D Design",
    },
  ]);

  const eventPress = (event) => {
    alert(JSON.stringify(event));
  };

  function ModalManager() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button style={styles.button} title="+    " onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
          <Text>Hello</Text>
          <View styles={styles.button}>
            <Button title="x" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
      <View style={styles.container}>
        <EventCalendar
          eventTapped={eventPress}
          events={events}
          width={width}
          size={60}
          scrollToFirst={true}
          startTime={12}
          endTime={24}
        />
      </View>
    </SafeAreaView>
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
  button: {
    alignSelf: "flex-end",
  },
});
