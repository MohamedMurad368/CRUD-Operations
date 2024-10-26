import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; 
import tasksReducer from './features/TasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
