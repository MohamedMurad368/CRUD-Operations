// src/Store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // تأكد من استيراد thunk بهذا الشكل
import tasksReducer from './features/TasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // إضافة middleware
});
