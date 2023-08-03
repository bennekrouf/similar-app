/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SwipablePage from './components/SwipablePage';
import {View} from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      {/* Main App Content */}
      <SwipablePage />
    </View>
  );
};

export default App;
