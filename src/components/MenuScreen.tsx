import React, {useEffect, useState, useContext} from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Logger } from 'mayo-logger';

import { RootStackParamList } from '../models/interfaces';
import Header from '../components/Header';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LessonPages from './lesson/LessonPages';
import DiscriminantExercise from './exercise/DiscriminantExercise';
import useFetchLessons from '../hooks/useFetchLessons';
import {loadExercise} from '../api/loadExercisesList';

const MenuScreen = () => {
  const { authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChapterSelection = (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

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

  // Retrieve the necessary data for your header
  // This can be fetched from a context, state, or props
  const count = 10; // example count
  const goodCount = 5; // example good count
  const wrongCount = 2; // example wrong count
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
        <Header
          count={count}
          goodCount={goodCount}
          wrongCount={wrongCount}
          content={contents}
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