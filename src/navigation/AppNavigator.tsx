import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from 'mayo-firebase-auth';
import { RootStackParamList } from '../models/RootStackParamList';

import HomeScreen from '../components/HomeScreen';
import InitialScreen from '../components/InitialScreen';
import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';

const Stack = createStackNavigator<RootStackParamList>();
const opt = { headerLeft: () => null, headerShown: false };

export const MainApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="SignIn" component={SignInScreen} options={opt} />
        <Stack.Screen name="Login" component={InitialScreen} options={opt} />
        <Stack.Screen name="Home" component={HomeScreen} options={opt}/>
        <Stack.Screen name="LessonPages" component={LessonPages} options={opt}/>
        <Stack.Screen name="DiscriminantExercise" component={DiscriminantExercise} options={opt}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};