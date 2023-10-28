import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/interfaces';

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Button title="Lessons" onPress={() => navigation.navigate('LessonPages')} />
      <Button 
        title="Exercises" 
        onPress={() => navigation.navigate('DiscriminantExercise')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen;
