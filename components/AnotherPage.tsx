import React from 'react';
import {Button, View, Text} from 'react-native';

const AnotherPage = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Another Page</Text>
      <Button
        title="Go to Swipable Page"
        onPress={() => navigation.navigate('SwipablePage')}
      />
    </View>
  );
};

export default AnotherPage;
