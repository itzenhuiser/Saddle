import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function ItemsTable({cart, cartPrice, updateCartPrice, updateCart}) {
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused){
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/itemsavailible');
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addCart = (itemName, itemPrice, itemQuantity) => {
    const existingItem = cart[itemName];
    
    if (existingItem) {
      if (existingItem.quantity < itemQuantity) {
        // If the item already exists in the cart and quantity limit not reached, increase the quantity by one
        cart[itemName] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          price: itemPrice
        };
      } else {
        // Handle case where quantity limit is reached
        Alert.alert('Quantity limit reached for item:', itemName);
      }
    } else {
      // If the item is not in the cart, add it with quantity 1
      cart[itemName] = { quantity: 1, price: itemPrice };
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
    if (!Array.isArray(items)) {
      return null;
    }
  
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
      const rowData = [];
      for (let j = 0; j < 4 && i + j < items.length; j++) {
        const item = items[i + j];
        rowData.push(
          <td key={item.item_id} style={styles.text}>
            {/* <div>ID: {item.ID}</div> */}
            <div style={{ fontWeight: 'bold', fontSize: 20, backgroundColor: 'lightblue', padding: 5, borderRadius: 5, textTransform: 'capitalize' }}>{item.item_name}</div>
            <div>{item.item_description.charAt(0).toUpperCase() + item.item_description.slice(1)}</div>
            <div style={{ fontWeight: 'bold' }}>${item.item_price}</div>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.item} source={require(`./images/${item.item_name}.jpg`)} /> 
              <View style={{ height: '100%', marginRight: 10 }}></View>
              <View style={{ flexDirection: 'column' }}>
                <Button title="Add" color = "green" onPress={() => addCart(item.item_name, item.item_price, item.item_quantity)}/>
                <View style={{ width: '100%', marginBottom: 5 }}></View>
                <Button title="Remove" color = "red" onPress={() => removeCart(item.item_name, item.item_price)} style={styles.remove_button}/>
              </View>
            </View>
          </td>
        );
      }
      rows.push(<tr key={i}>{rowData}</tr>);
    }
  
    return rows;
  };

  return (
    <div style={styles.table_div}>
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
     height: '100vh', 
     overflowY: 'scroll' 
  },
  text: {
  color: 'black',
  fontSize: 18, // Adjust the font size as needed
  fontWeight: 'normal', // Change the font weight if desired
  marginBottom: 10, // Adjust the spacing between items
  padding: 10, // Add padding to the text container
  border: '1px solid #ccc', // Add a border around each item
  borderRadius: 5, // Add rounded corners
  backgroundColor: '#f9f9f9', // Set a background color for better readability
},
  add_button: {
    backgroundColor: "green",
    color: "white"
  },
  remove_button: {
    backgroundColor: "red",
    color: "white"
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