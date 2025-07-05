import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tracker_items';

// Save a new item
export const saveItem = async (item) => {
  try {
    const items = await getItems();
    const newItems = [...items, { ...item, id: Date.now().toString() }];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    console.log('Item saved');
    return newItems;
  } catch (e) {
    console.error('Error saving item:', e);
    return null;
  }
};

// Get all items
export const getItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error fetching items:', e);
    return [];
  }
};

// Delete an item by ID
export const deleteItem = async (id) => {
  try {
    const items = await getItems();
    const newItems = items.filter(item => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    return newItems;
  } catch (e) {
    console.error('Error deleting item:', e);
    return null;
  }
};

// Edit an item by ID
export const editItem = async (id, updatedFields) => {
  try {
    const items = await getItems();
    const newItems = items.map(item =>
      item.id === id ? { ...item, ...updatedFields } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    return newItems;
  } catch (e) {
    console.error('Error editing item:', e);
    return null;
  }
};
