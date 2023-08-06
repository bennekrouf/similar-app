// MainContent.tsx
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {LessonListProps} from '../../models/interfaces';
import MainVerses from './MainVerses';
import SimilarVerses from './SimilarVerses';

const MainContent: React.FC<LessonListProps> = ({
  verses,
  similars,
  opposites,
}) => (
  <ScrollView contentContainerStyle={styles.container}>
    {verses.length > 0 && <MainVerses verses={verses} isOpposite={false} />}
    {opposites.length > 0 && (
      <SimilarVerses verses={opposites} isOpposite={true} />
    )}
    {similars.length > 0 && (
      <SimilarVerses verses={similars} isOpposite={false} />
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default MainContent;
