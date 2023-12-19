import React, {useEffect, useState} from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

import Header from './Header';
import LessonPages from './lesson/LessonPages';
import DiscriminantExercise from './exercise/DiscriminantExercise';
import { loadExercise } from '../api/loadExercisesList';
import { rangeParamsURI } from '../api/settingsToRanges';
import { UserState, initialState } from '../models/UserState';
import { useFetchUser } from '../hooks/useFetchUser';

const HomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [exercises, setExercises] = useState();
  const [userState, setUserState, loading] = useFetchUser<UserState>(initialState);
  
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