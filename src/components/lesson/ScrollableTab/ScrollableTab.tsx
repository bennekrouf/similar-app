import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../../models/interfaces';
import { RootStackParamList } from '../../../models/interfaces';

const ScrollableTab: React.FC<ScrollableTabProps> = ({content}) => {
  const {t} = useTranslation();

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'DiscriminantExercise'>>();

    // (async () => {
    //   setExercises(await loadExercise(kalima).catch(console.error));
    // })();

  return (
    <>
      <View style={styles.view}>
        <View>
          <LessonContent
            verses={content.verses}
            key="verseList"
            similars={content.similars}
            opposites={content.opposites}
          />
        </View>
      </View>
    </>
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
