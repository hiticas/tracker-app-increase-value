import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getItems, deleteItem } from '../storage/storage';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await getItems();
      setItems(storedItems);
    };
    const unsubscribe = navigation.addListener('focus', loadItems);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    const updatedItems = await deleteItem(id);
    if (updatedItems) setItems(updatedItems);
  };

  const handleEdit = (item) => {
    navigation.navigate('EditItem', { item });
  };

  return (
    <View style={styles.container}>
      <Text>Tracker App</Text>
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
      <Text>Items:</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text>{item.name} - {item.timestamp}</Text>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            activeOpacity={0.6}
            style={styles.actionButton}
          >
            <Text style={{ color: 'blue' }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            activeOpacity={0.6}
            style={styles.actionButton}
          >
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionButton: {
    marginLeft: 10,
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
});
