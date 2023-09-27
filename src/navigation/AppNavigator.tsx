import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignInScreen, UserProvider,  } from 'rn-auth-firebase';

import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';
import InitialScreen from '../components/InitialScreen';

type RootStackParamList = {
    Initial: undefined;
    LessonPages: undefined;
    SignIn: { firebaseConf: any; app: string };
    DiscriminantExercise: {
      kalima: string;
      chapterName: string;
    };
  };

// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();

export const MainApp: React.FC = () => {
  return (
    <UserProvider>
      <>
        <StatusBar hidden={false} backgroundColor="black" barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Initial" component={InitialScreen} />
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
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{title: "Sign In", headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </UserProvider>
  );
};