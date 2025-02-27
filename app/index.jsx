import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../src/redux/todoSlice';
import TodoApp from '../src/components/TodoApp';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos()); // ✅ Load todos from AsyncStorage
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* ✅ Show loading indicator with better design */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      )}

      {/* ✅ Show error message in a modern box */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      <TodoApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 5, 
    width: screenWidth,
    backgroundColor: '#F5F5F5', 
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: '#ffdddd',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
});

