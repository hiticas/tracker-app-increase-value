import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { saveItem } from '../storage/storage';

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleAddItem = async () => {
    if (name) {
      const newItem = { name, timestamp: new Date().toISOString() };
      await saveItem(newItem);
      setName('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save Item" onPress={handleAddItem} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    width: '80%',
  },
});