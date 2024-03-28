import React from "react";
import "react-native-gesture-handler";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./screens/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import InventoryScreen from "./screens/InventoryScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LogScreen from "./screens/LogScreen";
import CashPaymentScreen from "./screens/CashPaymentScreen";
import CreditPaymentScreen from "./screens/CreditPaymentScreen";

const Drawer = createDrawerNavigator();
const PaymentStack = createStackNavigator();
const RootStack = createStackNavigator(); 

function PaymentStackScreen() {
  return (
    <PaymentStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <PaymentStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Payment Options" }}
      />
      <PaymentStack.Screen
        name="CashPayment"
        component={CashPaymentScreen}
        options={{ title: "Cash Payment" }}
      />
      <PaymentStack.Screen
        name="CreditPayment"
        component={CreditPaymentScreen}
        options={{ title: "Credit Payment" }}
      />
    </PaymentStack.Navigator>
  );
}


function AppDrawer() {
  return (

    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="PaymentFlow" component={PaymentStackScreen} options={{ drawerLabel: "Payment" }} />
      <Drawer.Screen name="Inventory" component={InventoryScreen} />
      <Drawer.Screen name="Appointment" component={AppointmentScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// Define a new component that uses the useAuth hook
function AuthenticatedApp() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // User is logged in, show the main app with drawer navigation
          <RootStack.Screen name="AppDrawer" component={AppDrawer} />
        ) : (
          // User is not logged in, show the login screen
          <RootStack.Screen name="LogIn" component={LogScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
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
