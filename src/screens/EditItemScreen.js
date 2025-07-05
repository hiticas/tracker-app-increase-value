import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { editItem } from '../storage/storage';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [name, setName] = useState(item.name);

  const handleSave = async () => {
    if (name) {
      await editItem(item.id, { name });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Item</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Edit item name"
      />
      <Button title="Save Changes" onPress={handleSave} />
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
