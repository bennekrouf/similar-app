// MainContent.tsx
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {LessonListProps} from '../../models/interfaces';
import Verses from './Verses';
import Similars from './Similars';
import Opposites from './Opposites';

const MainContent: React.FC<LessonListProps> = ({
  verses,
  similars,
  opposites,
}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Verses verses={verses} />
    <Opposites opposites={opposites} />
    <Similars similars={similars} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default MainContent;
