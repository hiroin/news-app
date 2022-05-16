import React from 'react';
import AppNavigater from './navigation/AppNavigater';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigater />
      </PersistGate>
    </Provider>
  );
}
