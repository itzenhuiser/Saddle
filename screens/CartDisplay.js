import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';

function CartDisplay({cart, cartPrice, updateCartPrice, updateCart}) {
  // No need to initialize cart and cartPrice here
  const navigation = useNavigation();
  useEffect(() => {
    // Any side effects based on cart or cartPrice changes can be handled here
  }, [cart, cartPrice]);

  const formattedCartPrice = cartPrice.toFixed(2);

  const updateInventory = async (cartData) => {
    console.log(cartData);
    // Make an HTTP request to send the cart data to the endpoint
    try {
      const response = await fetch('http://localhost:3001/updateinventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData, cartPrice),
      });
  
      if (response.ok) {
        console.log('Cart data sent successfully:', response);
      } else {
        throw new Error('Failed to send cart data');
      }
    } catch (error) {
      console.error('Error sending cart data:', error);
    }
  };

  const handleNavigateToPayment = async () => {
    navigation.navigate('PaymentFlow', {
      screen: 'Payment',
      params: { 
        cartPrice: cartPrice,
        cart: cart
      }
    });

    await updateInventory(cart);
    updateCart({});
    updateCartPrice(0);
  };
  const styles = StyleSheet.create({
    cartContainer: {
      backgroundColor: "#f9f9f9",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cartTitle: {
      fontSize: 20,
      fontWeight: "bold",
      backgroundColor: "lightblue",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      textAlign: "center",
    },
    cartItem: {
      marginBottom: 5,
      fontSize: 25,
    },
    cartTotal: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
    },
  });

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Cart</Text>
      {Object.keys(cart).map((itemName) => (
        <View key={itemName} style={styles.cartItem}>
          <Text>{itemName}: {cart[itemName].quantity}</Text>
        </View>
      ))}
      <Text style={styles.cartTotal}>Total Price: ${formattedCartPrice}</Text>
      <Button title="Checkout" onPress={handleNavigateToPayment} />
    </View>
  );
}

export default CartDisplay;