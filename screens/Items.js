import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Alert, Text } from 'react-native';

function ItemsTable({cart, cartPrice, updateCartPrice, updateCart}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/items');
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addCart = (itemName, itemPrice) => {
    const existingItem = cart[itemName];

    if (existingItem) {
      // If the item already exists in the cart, increase the quantity by one
      cart[itemName] = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
    } else {
      // If the item is not in the cart, add it with quantity 1
      cart[itemName] = { quantity: 1 };
    }

    // Add the item price to the cartPrice
    const updatedCartPrice = +(cartPrice + itemPrice).toFixed(2); // Round to two decimal places
    updateCartPrice(updatedCartPrice);
    updateCart({ ...cart });
    console.log(cart);
  }

  const removeCart = (itemName, itemPrice) => {
    const updatedCart = { ...cart };

    if (updatedCart[itemName]) {
      // If the item exists in the cart, decrease the quantity by one
      updatedCart[itemName] = {
        ...updatedCart[itemName],
        quantity: updatedCart[itemName].quantity - 1
      };

      // If the quantity becomes zero, remove the item from the cart
      if (updatedCart[itemName].quantity === 0) {
        delete updatedCart[itemName];
      }

      // Subtract the item price from the cartPrice
      const updatedCartPrice = +(cartPrice - itemPrice).toFixed(2); // Round to two decimal places

      // Update the state with the new cart and cartPrice
      updateCart(updatedCart);
      updateCartPrice(updatedCartPrice);
    }
  }
  
  const renderGridRows = () => {
    console.log(items);
    if (!Array.isArray(items)) {
      return null;
    }
  
    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
      const rowData = [];
      for (let j = 0; j < 3 && i + j < items.length; j++) {
        const item = items[i + j];
        rowData.push(
          <td key={item.item_id} style={styles.text}>
            {/* <div>ID: {item.ID}</div> */}
            <div>{item.item_name}</div>
            <div>{item.item_description}</div>
            <div>{item.item_price}</div>
            <Image style={styles.item} source={item.image_picture} />
            <Button title="Add" onPress={() => addCart(item.item_name, item.item_price)} style={styles.add_button}/>
            <Button title="Remove" onPress={() => removeCart(item.item_name, item.item_price)} style={styles.remove_button}/>
          </td>
        );
      }
      rows.push(<tr key={i}>{rowData}</tr>);
    }
  
    return rows;
  };

  return (
    <div style={styles.table_div}>
      <h2>Items Table</h2>
      <table>
        <tbody>
          {renderGridRows()}
        </tbody>
      </table>
    </div>
  );
}

// export default CartDisplay;

const styles = StyleSheet.create({
  table_div: {
     height: '400px', 
     overflowY: 'scroll' 
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  add_button: {
    backgroundColor: "green",
  },
  remove_button: {
    backgroundColor: "red",
  },
  errorMessage: {
    color: 'red', // This will make the message stand out against the black background
    fontSize: 16, // Adjust the size as needed
    marginTop: 5, // Add some space above the message
    marginBottom: 10,
  },
  item: {
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "space-evenly",
    height: 125,
    width: 125,
  }
});

export default ItemsTable;