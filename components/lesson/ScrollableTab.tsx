import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {useTranslation} from 'react-i18next';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../models/interfaces';
import {
  View,
  StyleSheet,
} from 'react-native';
import ScrollableTabHeader from './ScrollableTabHeader';

const ScrollableTab: React.FC<ScrollableTabProps> = ({
  kalima,
  verses,
  similars,
  chapters,
  opposites,
  handleChapterSelection,
}) => {
  const {t} = useTranslation();

  return (
    <ScrollableTabView>
      <View style={styles.view}>
        <ScrollableTabHeader 
          kalima={kalima} verses={verses} chapters={chapters}
          handleChapterSelection={handleChapterSelection}/>
        <View>
          <LessonContent
            verses={verses}
            key="verseList"
            similars={similars}
            opposites={opposites}
          />
        </View>
      </View>
    </ScrollableTabView>
  );
};

export default ScrollableTab;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  },
});
