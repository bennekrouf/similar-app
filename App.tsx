import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SwipablePage from './components/lesson/SwipablePage';
import DiscriminantExercise from './components/exercise/DiscriminantExercise';

// Create the application stack
const Stack = createStackNavigator();

const App: React.FC = () => (
  <>
    <StatusBar hidden={false} backgroundColor="black" barStyle="dark-content" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SwipablePage"
          component={SwipablePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiscriminantExercise"
          component={DiscriminantExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default App;
