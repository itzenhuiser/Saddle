import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Button} from 'react-native';

function CartDisplay({ cart, cartPrice }) {
  // No need to initialize cart and cartPrice here
  const navigation = useNavigation();
  useEffect(() => {
    // Any side effects based on cart or cartPrice changes can be handled here
  }, [cart, cartPrice]);

  const formattedCartPrice = cartPrice.toFixed(2);

  const handleNavigateToPayment = () => {
    navigation.navigate('PaymentFlow', {
      screen: 'Payment',
      params: { 
        cartPrice: cartPrice,
        cart: cart
      }
    });
  };
  

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {Object.keys(cart).map((itemName) => (
          <li key={itemName}>
            {itemName}: {cart[itemName].quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${formattedCartPrice}</p>
      <Button title="Checkout" onPress={handleNavigateToPayment} />
    </div>
  );
}

export default CartDisplay;