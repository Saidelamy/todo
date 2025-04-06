import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: 'all',
};

export const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=5',
  );
  const data = await response.json();
  console.log(data);
  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: '',
    status: task.completed ? 'Completed' : 'To Do',
  }));
});

const taskSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        task.id === action.payload.id ? action.payload : task;
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // filterTask: (state, action) => {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask, editTask, filterTask } = taskSlice.actions;
export default taskSlice.reducer;
