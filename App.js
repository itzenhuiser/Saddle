import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from "./screens/AuthContext"; // Adjust the path as necessary
import HomeScreen from "./screens/HomeScreen";
import InventoryScreen from "./screens/InventoryScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LogScreen from "./screens/LogScreen";
import CashPaymentScreen from './screens/CashPaymentScreen'; // Adjust the path as necessary
import CreditPaymentScreen from "./screens/CreditPaymentScreen";



const Drawer = createDrawerNavigator();
const PaymentStack = createStackNavigator();


function PaymentStackScreen() {
  return (
    <PaymentStack.Navigator
      screenOptions={{
        headerShown: true, // Make sure the header is shown
        headerStyle: {
          backgroundColor: 'black', // Set your header color
        },
        headerTintColor: 'white', // Set the color of the back arrow and title
        headerBackTitleVisible: false, // Hide the back button title (optional)
        headerTitleAlign: 'center', // Center the header title

      }}
    >
      <PaymentStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Payment Options' }} // Customize header title
      />
      <PaymentStack.Screen
        name="CashPayment"
        component={CashPaymentScreen}
        options={{ title: 'Cash Payment' }} // Customize header title
      />
      <PaymentStack.Screen
        name="CreditPayment"
        component={CreditPaymentScreen}
        options={{ title: 'Credit Payment' }} // Customize header title
      />
      {/* Add other screens as needed */}
    </PaymentStack.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            backgroundColor: "black",
            drawerActiveBackgroundColor: "grey",
            drawerActiveTintColor: "white",
            drawerInactiveTintColor: "white",
            //headerTitleStyle: { display: "none" },
            drawerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },}}>

          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="PaymentFlow" component={PaymentStackScreen} options={{ drawerLabel: 'Payment' }} />
          <Drawer.Screen name="Inventory" component={InventoryScreen} />
          <Drawer.Screen name="Appointment" component={AppointmentScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Log In/Out" component={LogScreen} />
        </Drawer.Navigator>
      </NavigationContainer>

    </AuthProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  drawer: {
    flex: 1,
    backgroundColor: "black",
  },
});
