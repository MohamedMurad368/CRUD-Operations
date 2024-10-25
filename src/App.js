// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store'; 
import TaskList from './Components/TaskList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <TaskList />
      </div>
    </Provider>
  );
};

export default App;
