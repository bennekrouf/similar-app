// MainContent.tsx
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {LessonListProps} from '../../../models/interfaces';
import MainVerses from './LessonContent/MainVerses';
import SimilarVerses from './LessonContent/SimilarVerses';

const LessonContent: React.FC<LessonListProps> = ({
  verses,
  similars,
  opposites,
}) => (
  <ScrollView contentContainerStyle={styles.container}>
    {verses.length > 0 && (
      <MainVerses key="mainVerses" verses={verses} isOpposite={false} />
    )}
    {opposites.length > 0 && (
      <SimilarVerses key="opposites" verses={opposites} isOpposite={true} />
    )}
    {similars.length > 0 && (
      <SimilarVerses
        key="similars"
        verses={similars}
        isOpposite={!opposites.length}
      />
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
  },
});

export default LessonContent;
