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