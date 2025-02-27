import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, saveTodos } from '../redux/todoSlice';
import TodoItem from './TodoItem';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const TodoApp = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  useEffect(() => {
    dispatch(saveTodos(todos));
  }, [todos, dispatch]);

  const handleAddTodo = () => {
    if (text.trim() === '') {
      Alert.alert('!!! Warning', 'Enter Some Thing....');
      return;
    }
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.inputRow}>
      
        <TextInput
          placeholder="✍️ Add a new task..."
          placeholderTextColor="#555"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <TouchableOpacity 
          style={[styles.addButton, text ? styles.activeButton : styles.inactiveButton]} 
          onPress={handleAddTodo}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {todos.length === 0 ? (
        <Text style={styles.emptyText}>🎉 No tasks! Enjoy your time.</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TodoItem item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: screenWidth,
    padding: 20, 
    backgroundColor: '#F5F5F5', 
    flex: 1 
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 15,
    justifyContent: 'center', 
  },
  input: { 
    flex: 1,
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 14, 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF', 
    fontSize: 16, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, 
  },
  addButton: {
    marginLeft: 10,
    padding: 12,
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  inactiveButton: {
    backgroundColor: '#A0A0A0',
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 60, 
    fontSize: 20, 
    color: 'gray' 
  },
});

export default TodoApp;
