import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    return todos ? JSON.parse(todos) : []; 
  } catch (error) {
    return rejectWithValue('Failed to load todos'); 
  }
});


export const saveTodos = createAsyncThunk('todos/saveTodos', async (todos, { rejectWithValue }) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    return todos; 
  } catch (error) {
    return rejectWithValue('Failed to save todos');
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: { todos: [], loading: false, error: null },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(saveTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTodos.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTodo, toggleTodoCompletion, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
