import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos', error);
  }
};

export const loadTodos = async () => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error loading todos', error);
    return [];
  }
};
