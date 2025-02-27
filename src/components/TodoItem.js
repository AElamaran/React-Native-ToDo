import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodoCompletion, deleteTodo } from '../redux/todoSlice';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  

  return (
    <TouchableOpacity 
      onPress={() => dispatch(toggleTodoCompletion(item.id))} 
      style={styles.card}
    >
     
      <View style={[styles.dot, { backgroundColor: item.completed ? '#4CAF50' : '#FF9800' }]} />

      {/* Task Details */}
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, item.completed && styles.completed]}>{item.text}</Text>
        <Text style={styles.description}>{item.completed ? "Completed" : "Pending"}</Text>
      </View>

    
      <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))} style={styles.deleteButton}>
        <Ionicons name="trash" size={25} color="#FF5E5E" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    borderRadius: 12,
    marginVertical: 6,
    alignSelf: 'center',
    justifyContent:'center', 
    width: screenWidth* 0.85, 
    marginRight:15, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, 
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 10, 
  },
});

export default TodoItem;
