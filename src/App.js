import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/Store'; 
import Home from './Home';
const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Crud-Operations</h1>
        <Home />
      </div>
    </Provider>
  );
};

export default App;
