// MainContent.tsx
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {LessonListProps} from '../models/interfaces';
import Verses from './Verses';
import Similars from './Similars';

const MainContent: React.FC<LessonListProps> = ({verses, similars}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Verses verses={verses} />
    <Similars similars={similars} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default MainContent;
