// MainContent.tsx
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {LessonListProps} from '../../models/interfaces';
import Verses from './Verses';
import Opposites from './Opposites';

const MainContent: React.FC<LessonListProps> = ({
  verses,
  similars,
  opposites,
}) => (
  <ScrollView contentContainerStyle={styles.container}>
    {verses.length > 0 && <Verses verses={verses} />}
    {opposites.length > 0 && <Opposites opposites={opposites} />}
    {similars.length > 0 && <Opposites opposites={similars} />}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default MainContent;
