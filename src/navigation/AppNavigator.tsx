import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from 'mayo-firebase-auth';
import { RootStackParamList } from '../models/RootStackParamList';

import HomeScreen from '../components/HomeScreen';
import InitialScreen from '../components/InitialScreen';
import Lesson from '../components/lesson/Lesson';
import Exercise from '../components/exercise/Exercise';
import { CurrentScreenProvider } from '../hooks/CurrentScreenContext';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();
const opt = { headerLeft: () => null, headerShown: false };

export const MainApp: React.FC = () => {
  return (
    <CurrentScreenProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="SignIn" component={SignInScreen} options={opt} />
          <Stack.Screen name="Login" component={InitialScreen} options={opt} />
          <Stack.Screen name="Home" component={HomeScreen} options={opt}/>
          <Stack.Screen name="Lesson" component={Lesson} options={opt}/>
          <Stack.Screen name="Exercise" component={Exercise} options={opt}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CurrentScreenProvider>
  );
};