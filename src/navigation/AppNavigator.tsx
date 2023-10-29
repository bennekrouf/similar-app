import React from 'react';
// import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MayoSettingsProvider } from 'mayo-settings';
import { SignInScreen, UserProvider,  } from 'mayo-firebase-auth';

import { ChapterProvider } from '../hooks/useFetchChapters';
import MenuScreen from '../components/MenuScreen';
import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';
import InitialScreen from '../components/InitialScreen';
import { RootStackParamList } from '../models/interfaces';

// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();

export const MainApp: React.FC = () => {
  return (
    <NavigationContainer>
        <UserProvider>
          <ChapterProvider>
            <MayoSettingsProvider>
              {/* <StatusBar hidden={false} backgroundColor="black" barStyle="dark-content" /> */}
                <Stack.Navigator initialRouteName="Initial">
                  <Stack.Screen name="SignIn" component={SignInScreen} 
                    options={{ 
                      headerLeft: () => null,  // Hide back button
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Menu" component={MenuScreen} 
                    options={{ 
                      headerLeft: () => null,  // Hide back button
                      headerShown: false,
                    }}/>
                  <Stack.Screen
                    name="LessonPages"
                    component={LessonPages}
                    options={({}) => ({ headerShown: false})}
                  />
                  <Stack.Screen
                    name="DiscriminantExercise"
                    component={DiscriminantExercise}
                    options={({route}) => ({
                      title: route.params.kalima,
                      headerBackTitle: route.params.chapterName || '',
                    })}
                  />
                </Stack.Navigator>
      </MayoSettingsProvider>
          </ChapterProvider>
        </UserProvider>
    </NavigationContainer>
    );
};