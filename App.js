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

function CustomDrawerContent() {
  const { user, logout } = useAuth();

  // Determine initial route based on user's login status
  const initialRoute = user ? "Home" : "Log In";

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        backgroundColor: "black",
        drawerActiveBackgroundColor: "grey",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
        drawerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="PaymentFlow" component={PaymentStackScreen} options={{ drawerLabel: "Payment" }} />
      <Drawer.Screen name="Inventory" component={InventoryScreen} />
      <Drawer.Screen name="Appointment" component={AppointmentScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      {user ? (
        <Drawer.Screen
          name="Logout"
          component={View} // Dummy component for logout functionality
          options={{
            drawerLabel: "Log Out",
            drawerItemStyle: { height: 0 },
            title: "Logout",
            headerShown: false,
          }}
          listeners={{
            focus: () => {
              logout();
            },
          }}
        />
      ) : (
        <Drawer.Screen name="Log In" component={LogScreen} />
      )}
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <CustomDrawerContent />
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
