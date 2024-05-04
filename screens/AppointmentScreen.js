import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
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

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventSummary, setEventSummary] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addEvent = () => {
    const newEvent = {
      start: eventDate + " " + eventStart,
      end: eventDate + " " + eventEnd,
      title: eventTitle,
      summary: eventSummary,
    };
    setEvents([...events, newEvent]);
    toggleModal();

    setEventTitle("");
    setEventDate("");
    setEventStart("");
    setEventEnd("");
    setEventSummary("");
  };

  const eventPress = (event) => {
    alert(JSON.stringify(event));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button style={styles.button} title="+    " onPress={toggleModal} />
        <Modal style={styles.modal} isVisible={isModalVisible}>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                paddingTop: 20,
              }}
            >
              Create Event
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoText}>
              <Text style={styles.text}>Event:</Text>
              <Text style={styles.text}>Date:</Text>
              <Text style={styles.text}>Time Start:</Text>
              <Text style={styles.text}>Time End:</Text>
              <Text style={styles.text}>Description:</Text>
            </View>
            <View style={styles.infoInput}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="gray"
                style={styles.input}
                value={eventTitle}
                onChangeText={setEventTitle}
              />
              <TextInput
                placeholder="yyyy-mm-dd"
                placeholderTextColor="gray"
                style={styles.input}
                value={eventDate}
                onChangeText={setEventDate}
              />
              <TextInput
                placeholder="hh:mm in 24hr"
                placeholderTextColor="gray"
                style={styles.input}
                value={eventStart}
                onChangeText={setEventStart}
              />
              <TextInput
                placeholder="hh:mm in 24hr"
                placeholderTextColor="gray"
                style={styles.input}
                value={eventEnd}
                onChangeText={setEventEnd}
              />
              <TextInput
                placeholder="Summary"
                placeholderTextColor="gray"
                style={styles.input}
                value={eventSummary}
                onChangeText={setEventSummary}
              />
            </View>
          </View>
          <View>
            <Button title="Add Event" onPress={addEvent} />
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
          startTime={8}
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
  modal: {
    justifyContent: "space-between",
    backgroundColor: "lightgray",
    margin: 25,
    marginTop: 250,
    marginBottom: 200,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
  },
  infoContainer: {
    flexDirection: "row",
    padding: 10,
  },
  infoText: {
    flexDirection: "column",
    width: "35%",
  },
  infoInput: {
    width: "55%",
  },
  text: {
    paddingTop: 8,
    fontSize: 20,
  },
});
