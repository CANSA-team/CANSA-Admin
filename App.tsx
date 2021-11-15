import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import SwitchNavigation from './src/components/SwitchNavigation';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SwitchNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
