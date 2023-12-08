import React from 'react';
import "react-native-devsettings";

// import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MayoSettingsProvider } from 'mayo-settings';
import { SignInScreen, UserProvider,  } from 'mayo-firebase-auth';
import { RootStackParamList } from '../models/RootStackParamList';
import { ChapterProvider } from '../hooks/useFetchChapters';
import MainScreen from '../components/MainScreen';
import InitialScreen from '../components/InitialScreen';
import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';

// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();
const webClientId = "581865288762-pn1dvg84mtf77v2qjsm2r40k7p7gj4qb.apps.googleusercontent.com";
const opt = { headerLeft: () => null, headerShown: false };

export const MainApp: React.FC = () => {
  debugger
  return (
    <NavigationContainer>
      <UserProvider>
        {/* <ChapterProvider> */}
          <MayoSettingsProvider>
            <Stack.Navigator initialRouteName="Initial">
            {/* <Stack.Navigator> */}
              <Stack.Screen name="SignIn" component={SignInScreen} options={opt} initialParams={{ config: { webClientId } }}/>
              <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Menu" component={MainScreen} options={opt}/>
              <Stack.Screen name="LessonPages" component={LessonPages} options={opt}/>
              <Stack.Screen name="DiscriminantExercise" component={DiscriminantExercise} options={opt}/>
            </Stack.Navigator>
          </MayoSettingsProvider>
        {/* </ChapterProvider> */}
      </UserProvider>
    </NavigationContainer>
    );
};