import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import EventCalendar from "react-native-events-calendar";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <EventCalendar
          eventTapped={eventPress}
          events={events}
          width={width}
          size={60}
          initDate={"2024-03-25"}
          scrollToFirst={true}
          timeStart={8}
          timeEnd={24}
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
});
