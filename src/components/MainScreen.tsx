import React, {useState} from 'react';
import { View, Button, StyleSheet } from 'react-native';

import Header from './Header';

import LessonPages from './lesson/LessonPages';
// import DiscriminantExercise from './exercise/DiscriminantExercise';
import {loadExercise} from '../api/loadExercisesList';

const MainScreen = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const [selectedOption, setSelectedOption] = useState(null);

  const stats = {
    count: 10,
    goodCount: 5,
    wrongCount: 2,
  }
  // Logger.info('User Preference Modal State:', { isOpen: isMayoSettingsOpen }, { tag: 'HomeScreen:ModalState' });

  let content;
  switch (selectedOption) {
    case 'Lessons':
      content = <LessonPages selectedChapter={selectedChapter}/>;
      break;
    // case 'Exercises':
    //   content = <DiscriminantExercise settings={settings}/>;
    //   break;
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
        <Header stats={stats} selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}/>
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

export default MainScreen;