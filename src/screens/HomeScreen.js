import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getItems } from '../storage/storage';

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

  return (
    <View style={styles.container}>
      <Text>Tracker App</Text>
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
      <Text>Items:</Text>
      {items.map((item) => (
        <Text key={item.id}>{item.name} - {item.timestamp}</Text>
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
});