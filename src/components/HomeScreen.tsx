import React, {useEffect, useState, useContext} from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

import Header from './Header';
import LessonPages from './lesson/LessonPages';
import DiscriminantExercise from './exercise/DiscriminantExercise';
import { loadExercise } from '../api/loadExercisesList';
import { rangeParamsURI } from '../api/settingsToRanges';
import { UserState, initialState } from '../models/UserState';
import { useFetchUser } from '../hooks/useFetchUser';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/RootStackParamList';

const HomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [exercises, setExercises] = useState();
  const [userState, setUserState, loading] = useFetchUser<UserState>(initialState);
  const { authEvents, user } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const onSignedOut = async () => {
      Logger.info('User signed out. Navigating to SignIn.', null, { tag: 'HomeScreen:onSignedOut' });
      navigation.navigate('SignIn');
    };
    
    authEvents.on('signedOut', onSignedOut);
    
    return () => {
      Logger.info('Cleanup: Removing signedOut event listener.', null, { tag: 'HomeScreen:useEffectCleanup' });
      authEvents.off('signedOut', onSignedOut);
    };
  }, []);

  useEffect(() => {
    if(loading) return;
    const loadExercises = async () => {
      if (userState?.knownSourates) {
        // const ranges = rangeParamsURI(userState?.knownSourates);
        const exo = await loadExercise(); // TODO : pass the ranges as params
        setExercises(exo);
      }
    };
    loadExercises();
  }, [userState, loading]);
  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }
  
  let content:any;
  switch (selectedOption) {
    case 'Lessons':
      content = <LessonPages selectedChapter={userState.selectedChapter}/>;
      break;
    case 'Exercises':
      content = <DiscriminantExercise exercises={exercises}/>;
      break;
    default:
      content = (
        <View style={styles.container}>
          <Button title="Lessons" onPress={() => setSelectedOption('Lessons')} />
          <Button title="Exercises" onPress={() => setSelectedOption('Exercises')} />
        </View>
      );
  }
  
  return (
    <View style={styles.view}>
      <Header
        exercises={exercises}
        userState={userState} 
        setUserState={setUserState}
        loading={loading}
        />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  }
});

export default HomeScreen;