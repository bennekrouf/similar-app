import React, { useContext, useEffect } from 'react';
// import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MayoSettingsProvider } from 'mayo-settings';
import { SignInScreen, UserProvider, UserContext, UserContextType } from 'mayo-firebase-auth';
import { RootStackParamList } from '../models/RootStackParamList';
import { customInitializeFirebase } from 'mayo-firestore-write';

import { ChapterProvider } from '../hooks/useFetchChapters';
import MainScreen from '../components/MainScreen';
import InitialScreen from '../components/InitialScreen';
import LessonPages from '../components/lesson/LessonPages';
import DiscriminantExercise from '../components/exercise/DiscriminantExercise';
import * as firebaseConfig from '../../fireBaseConfig';
// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();
const webClientId = "581865288762-pn1dvg84mtf77v2qjsm2r40k7p7gj4qb.apps.googleusercontent.com";
const opt = { headerLeft: () => null, headerShown: false };

export const MainApp: React.FC = () => {
  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const initializeFirebase = async () => {
      await customInitializeFirebase(firebaseConfig);
    };

    if(user) initializeFirebase();
  }, [user]);
  return (
    // <NavigationContainer>
    //   <UserProvider>
        <ChapterProvider>
          <MayoSettingsProvider>
            <Stack.Navigator
            // initialRouteName="SignIn"
            >
              <Stack.Screen name="SignIn" component={SignInScreen}
                initialParams={{ config: { webClientId } }}
                options={{ 
                  headerLeft: () => null,
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Menu" component={MainScreen} options={opt}/>
              <Stack.Screen name="LessonPages" component={LessonPages} options={opt}/>
              <Stack.Screen name="DiscriminantExercise" component={DiscriminantExercise} options={opt}/>
            </Stack.Navigator>
          </MayoSettingsProvider>
        </ChapterProvider>
    //   </UserProvider>
    // </NavigationContainer>
    );
};