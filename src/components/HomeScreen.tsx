import React, {useEffect, useState, useContext} from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';

import Header from './Header';
import LessonPages from './lesson/LessonPages';
import DiscriminantExercise from './exercise/DiscriminantExercise';
import { loadExercise } from '../api/loadExercisesList';
import { rangeParamsURI } from '../api/settingsToRanges';
import { UserState, initialState } from '../models/UserState';
import { useFetchUser } from '../hooks/useFetchUser';

import { RootStackParamList } from '../models/RootStackParamList';
import useFetchLessons from '../hooks/useFetchLessons';

const HomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [userState, setUserState, loading] = useFetchUser<UserState>(initialState);
  const { authEvents, user } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const selectedChapter = userState?.selectedChapter;
  const { lesson, isLoading: lessonLoading, error: lessonError } = useFetchLessons(userState?.selectedChapter);
  
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

  const loadExercises = async () => {
    if (userState?.knownSourates) {
      const ranges = await rangeParamsURI();
      const exo = await loadExercise(ranges);
      setExercises(exo);
    }
  };

  const handleTogglePage = (nextPage) => {
    setSelectedOption(nextPage);
    if (nextPage === 'Exercise') {
      loadExercises();
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Image source={require('../../assets/mayologo.jpg')} style={styles.logo} />
      </View>);
  }
  
  let content:any;
  switch (selectedOption) {
    case 'Lesson':
      content = <LessonPages
        selectedChapter={userState?.selectedChapter}
        lesson={lesson}
        isLoading={lessonLoading}
        error={lessonError}
      />;
      break;
    case 'Exercise':
      content = <DiscriminantExercise exercises={exercises}/>;
      break;
    default:
      content = (
        <View style={styles.container}>
          <Button title="Lesson" onPress={() => setSelectedOption('Lesson')} />
          <Button title="Exercises" onPress={() => setSelectedOption('Exercise')} />
        </View>
      );
  }

  // Calculate the totals
  const totalGoodAnswers = Array.isArray(userState?.answerStats) ? userState?.answerStats.reduce((acc, stat) => acc + stat.g, 0) : 0;
  const totalWrongAnswers = Array.isArray(userState) ? userState?.answerStats.reduce((acc, stat) => acc + stat.w, 0) : 0;
  
  return (
    <View style={styles.view}>
      <Header
        exercises={exercises}
        userState={userState} 
        setUserState={setUserState}
        loading={loading}
        count={exercises?.length}
        goodCount={totalGoodAnswers}
        wrongCount={totalWrongAnswers}
        onTogglePage={handleTogglePage}
      />

      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
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
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
});

export default HomeScreen;