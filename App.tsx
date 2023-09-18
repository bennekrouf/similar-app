import {StatusBar} from 'react-native';
import React, { useEffect, useContext } from 'react';

import {NavigationContainer, useNavigation, NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LessonPages from './components/lesson/LessonPages';
import DiscriminantExercise from './components/exercise/DiscriminantExercise';
import { SignInScreen, UserContext, UserContextType } from 'rn-auth-firebase';
import {conf as firebaseConf} from './firebaseConfig';

import './locales/i18n';
import 'intl';
import 'intl/locale-data/jsonp/ar';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/hi';
import 'intl/locale-data/jsonp/id';
import 'intl/locale-data/jsonp/ms';
import 'intl/locale-data/jsonp/sq';
import 'intl/locale-data/jsonp/tr';
import 'intl/locale-data/jsonp/ur';
import 'intl/locale-data/jsonp/zh';

import 'intl-pluralrules';

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

const InitialScreen = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const app = 'abjad';
  useEffect(() => {
    if (user) {
      navigation.navigate('LessonPages');
    } else {
      navigation.navigate('SignIn', { firebaseConf, app });
    }
  }, [user]);

  return null;
};

const App: React.FC = () => {
  return (
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
          options={{title: "Sign In"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
)};

export default App;
