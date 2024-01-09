import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Lesson from './lesson/Lesson';
import Exercise from './exercise/Exercise';
import { UserState, initialState } from '../models/UserState';
import { useFetchUser } from '../hooks/useFetchUser';

import useFetchLessons from '../hooks/useFetchLessons';
import useFetchExercises from '../hooks/useFetchExercises';
import useCurrentScreen from '../hooks/useCurrentScreen';
import useHandleSignOut from '../hooks/useHandleSignOut';

const HomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userState, setUserState, loading] = useFetchUser<UserState>(initialState);
  const { lesson, isLoading: lessonLoading, error: lessonError } = useFetchLessons(userState?.selectedChapter);
  const { exercises, isLoading: exerciseLoading, error: exerciseError } = useFetchExercises();
  const [currentPage, setCurrentPage] = useState('Lesson');
  
  useCurrentScreen('Home');
  useHandleSignOut();

  const handleTogglePage = () => {
    const nextPage = currentPage === 'Exercise' ? 'Lesson' : 'Exercise';
    setCurrentPage(nextPage);
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
      content = <Lesson
        selectedChapter={userState?.selectedChapter}
        lesson={lesson}
        isLoading={lessonLoading}
        error={lessonError}
      />;
      break;
    case 'Exercise':
      content = <Exercise
        exercises={exercises}
        isLoading={exerciseLoading}
        error={exerciseError}
      />;
      break;
    default:
      content = (
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setSelectedOption('Lesson')}>
            <FontAwesomeIcon icon={faBook} size={24} style={styles.menuIcon} />
            <Text style={styles.menuText}>Lesson</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setSelectedOption('Exercise')}>
            <FontAwesomeIcon icon={faGraduationCap} size={24} style={styles.menuIcon} />
            <Text style={styles.menuText}>Exercises</Text>
          </TouchableOpacity>
        </View>
      );
  }

  // Calculate the totals
  const totalGoodAnswers = Array.isArray(userState?.answerStats) ? userState?.answerStats.reduce((acc, stat) => acc + stat.g, 0) : 0;
  const totalWrongAnswers = Array.isArray(userState) ? userState?.answerStats.reduce((acc, stat) => acc + stat.w, 0) : 0;
  
  return (
    <View style={styles.view}>
      <Header
        userState={userState} 
        setUserState={setUserState}
        loading={loading}
        count={exercises?.length}
        goodCount={totalGoodAnswers}
        wrongCount={totalWrongAnswers}
      />

      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    width: '80%',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
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