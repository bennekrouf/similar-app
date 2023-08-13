import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SwipablePage from './components/lesson/SwipablePage';
import DiscriminantExercise from './components/exercise/DiscriminantExercise';
import './locales/i18n';
import 'intl';
import 'intl/locale-data/jsonp/en'; // For English
import 'intl/locale-data/jsonp/ar'; // For Arabic
import 'intl-pluralrules';

type RootStackParamList = {
  SwipablePage: undefined; // If this route does not take any parameters
  DiscriminantExercise: {
    kalima: string;
    chapterName: string;
  };
};
// Create the application stack
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <>
    <StatusBar hidden={false} backgroundColor="black" barStyle="dark-content" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SwipablePage"
          component={SwipablePage}
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
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default App;
