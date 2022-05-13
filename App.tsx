import React from 'react';
import AppNavigater from './navigation/AppNavigater';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigater />
    </Provider>
  );
}
