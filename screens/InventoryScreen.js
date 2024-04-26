import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Modal, TouchableOpacity, TextInput, Dimensions, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';

function InventoryScreen() {
  const [items, setItems] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);

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
  const handleAddItem = () => {
    // Implement logic to trigger prompt for item details and image selection
    // Set the item details and image in the state
    setModalVisible(true);
  };

  const saveItem = () => {
    // Convert quantity and price to integers
    const quantity = parseInt(itemQuantity);
    const price = parseFloat(itemPrice);

    if (isNaN(quantity) || isNaN(price)) {
      alert('Please enter valid numerical values for Quantity and Price.');
      return;
    }

    // Save the item details and image to the state or send to an endpoint
    console.log('Item Details:', itemName, quantity, price, itemDescription, itemImage);
    // Send item data to an endpoint
    sendItemData().then(() => {
      fetchData(); // Refresh the table data after adding the item
      setModalVisible(false); // Close the modal after saving

      // Reset the modal values
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
      setItemDescription('');
      setItemImage(null);
    });
  };

  const sendItemData = async () => {
    const itemData = {
      itemName,
      itemPrice,
      itemQuantity,
      itemDescription,
      itemImage,
    };
  
    try {
      const response = await fetch('http://localhost:3001/additem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
  
      if (response.ok) {
        console.log('Item data sent successfully:', itemData);
        // Handle any additional actions after successful data submission
      } else {
        throw new Error('Failed to send item data');
      }
    } catch (error) {
      console.error('Error sending item data:', error);
    }
  };

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setItemImage(response.uri);
      }
    });
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal without saving
  };

  const removeItem = (itemName) => {
    // Make an HTTP request to send the item name to the endpoint for removal
    fetch('http://localhost:3001/removeitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemName: itemName }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Item removed successfully:', itemName);
        // Perform any additional actions after successful removal
        fetchData();
      } else {
        throw new Error('Failed to remove item');
      }
    })
    .catch(error => {
      console.error('Error removing item:', error);
    });
  };

  const renderGridRows = () => {
    const windowWidth = Dimensions.get('window').width;
    const itemWidth = 150; // Assuming each item width is 150 (adjust as needed)
    const itemsPerRow = Math.floor(windowWidth / itemWidth);
  
    const handleRemoveItem = (itemName) => {
        // Prompt the user with a confirmation dialog before removing the item
      const isConfirmed = window.confirm(`Are you sure you would like to remove ${itemName} from inventory?`);

      if (isConfirmed) {
        // If the user confirms, proceed with removing the item
        removeItem(itemName);
      } else {
        // If the user cancels, do nothing or provide feedback
        console.log('Removal canceled by user');
      }
    };

    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      const rowData = [];
      for (let j = 0; j < itemsPerRow && i + j < items.length; j++) {
        const item = items[i + j];
        rowData.push(
          <td key={item.item_id} style={{ ...styles.text, backgroundColor: item.item_quantity === 0 ? 'black' : styles.text.backgroundColor }}>
            <div style={{ position: 'relative' }}>
              <button 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  backgroundColor: 'red', 
                  color: 'white',
                  borderRadius: '25%' 
                }} 
                onClick={() => handleRemoveItem(item.item_name)}
              >
                X
              </button>
          </div>
            <div style={{ fontWeight: 'bold', fontSize: 20, backgroundColor: 'lightblue', padding: 5, borderRadius: 5, textTransform: 'capitalize' }}>{item.item_name}</div>
            <div style={{ fontWeight: 'bold' }}>Quantity: {item.item_quantity}</div>
            <Image style={styles.item} source={item.image_picture} />
          </td>
        );
      }
      rows.push(<tr key={i}>{rowData}</tr>);
    }

    rows.push(
      <tr key={items.length + 1}>
        <td colSpan={itemsPerRow}>
          <button style={styles.addButton} onClick={handleAddItem}>ADD ITEM</button>
        </td>
      </tr>
    );
  
    return rows;
  };

  return (
    <div>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={itemPrice}
            onChangeText={setItemPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Quantity"
            value={itemQuantity}
            onChangeText={setItemQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={itemDescription}
            onChangeText={setItemDescription}
            style={styles.input}
          />
          <Button title="Select Image" onPress={selectImage} />
          {itemImage && <Image source={{ uri: itemImage }} style={{ width: 200, height: 200 }} />}
          <TouchableOpacity style={styles.submitButton} onPress={saveItem}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <div style={styles.table_div}>
        <table>
          <tbody>
            {renderGridRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// export default CartDisplay;

const styles = StyleSheet.create({
  table_div: {
     height: '100vh', 
     overflowY: 'scroll' 
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 150, // Adjust width as needed
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    marginTop: 10, // Add spacing between buttons
    borderRadius: 5,
    width: 150, // Adjust width as needed
    textAlign: 'center',
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'red',
    color: 'whtie',
    borderRadius: '25%',
  },
});

export default InventoryScreen;