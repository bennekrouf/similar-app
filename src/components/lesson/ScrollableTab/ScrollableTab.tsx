import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../../models/ScrollableTabProps';

const ScrollableTab: React.FC<ScrollableTabProps> = ({content}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.view}>
      <LessonContent
        verses={content.verses}
        key="verseList"
        similars={content.similars}
        opposites={content.opposites}
      />
    </View>
  );
};

export default React.memo(ScrollableTab);

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  }
});
