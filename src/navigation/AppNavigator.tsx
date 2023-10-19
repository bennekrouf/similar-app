import React from 'react';
import { StatusBar, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChapterProvider } from '../hooks/useFetchChapters';
import { SignInScreen, UserProvider,  } from 'rn-auth-firebase';

import ErrorScreen from './ErrorScreen';
import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';
import InitialScreen from '../components/InitialScreen';
import { RootStackParamList } from '../models/interfaces';
import { webClientId } from '../../firebaseConfig';
import { UserPreferenceProvider } from 'rn-user-preference-modal';

// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();

export const MainApp: React.FC = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <UserPreferenceProvider>
          <StatusBar hidden={false} backgroundColor="black" barStyle="dark-content" />
            <Stack.Navigator>
              <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="LessonPages"
                component={LessonPages}
                options={({route}) => ({
                  // title: route.params.chapterName || '', // Set title for the back button when navigating away from this screen
                  headerShown: false, // Hide the header on this screen
                })}
              />
              <Stack.Screen
                name="DiscriminantExercise"
                component={DiscriminantExercise}
                options={({route}) => ({
                  title: route.params.kalima,
                  headerBackTitle: route.params.chapterName || '',
                })}
              />
            <Stack.Screen name="SignIn" component={SignInScreen} 
              options={{ 
              headerLeft: () => null,  // Hide back button
              headerShown: false,
            }}
            initialParams={Platform.OS === 'android' ? { webClientId } : undefined}
            />
            </Stack.Navigator>
        </UserPreferenceProvider>
      </UserProvider>
    </NavigationContainer>
    );
};