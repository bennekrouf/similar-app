import React, {useEffect, useState} from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Logger } from 'mayo-logger';
import { User } from 'mayo-firestore-write';

import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LessonPages from './lesson/LessonPages';
import DiscriminantExercise from './exercise/DiscriminantExercise';
import useFetchLessons from '../hooks/useFetchLessons';
import {loadExercise} from '../api/loadExercisesList';

const MenuScreen = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const getSelectedChapterFromStorage = async () => {
      try {
        Logger.info('Fetching selected chapter from storage', { tag: 'LessonPages' });
        const storedSelectedChapter = await AsyncStorage.getItem('selectedChapter');
        if (storedSelectedChapter) {
          setSelectedChapter(parseInt(storedSelectedChapter));
        }
      } catch (error) {
        Logger.error('Error retrieving selectedChapter from AsyncStorage', error, { tag: 'LessonPages' });
      }
    };

    if (user) {
      getSelectedChapterFromStorage();
    }
  }, []);

  const stats = {
    count: 10,
    goodCount: 5,
    wrongCount: 2,
  }
  // Logger.info('User Preference Modal State:', { isOpen: isMayoSettingsOpen }, { tag: 'HomeScreen:ModalState' });

  let content;
  switch (selectedOption) {
    case 'Lessons':
      content = <LessonPages />;
      break;
    case 'Exercises':
      content = <DiscriminantExercise />;
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
        <Header stats={stats} contents={contents}/>
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
  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5,
    elevation: 3, // This will add shadow in Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      // iOS shadow
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22, // iOS shadow
    shadowRadius: 2.22, // iOS shadow
    backgroundColor: '#fff', // You should set background color for the shadow to appear
  },
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  },
  optionsMenuText: {
    fontSize: 24,
    padding: 5,
  },
});

export default MenuScreen;