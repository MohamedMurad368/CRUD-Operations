// src/features/TasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state)); // حفظ الحالة في localStorage
    },
    editTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state)); // تحديث الحالة في localStorage
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState)); // تحديث الحالة في localStorage
      return newState;
    },
  },
});

export const { addTask, editTask, deleteTask } = TasksSlice.actions;
export default TasksSlice.reducer;
