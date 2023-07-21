/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ScrollableSwipablePage from './components/ScrollableSwipablePage';
import {View} from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      {/* Main App Content */}
      <ScrollableSwipablePage />
    </View>
  );
};

export default App;
