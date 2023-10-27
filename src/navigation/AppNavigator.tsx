import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChapterProvider } from '../hooks/useFetchChapters';
import { SignInScreen, UserProvider,  } from 'mayo-firebase-auth';

import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';
import InitialScreen from '../components/InitialScreen';
import { RootStackParamList } from '../models/interfaces';
import { UserPreferenceProvider } from 'mayo-user-preference-modal';
// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();

export const MainApp: React.FC = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <ChapterProvider>
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
            />
            </Stack.Navigator>
        </UserPreferenceProvider>
        </ChapterProvider>
      </UserProvider>
    </NavigationContainer>
    );
};