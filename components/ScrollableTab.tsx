import React from 'react';
import {View, Text} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VerseList from './VerseList';
import {ScrollableTabProps} from './interfaces';
import styles from './styles';

const ScrollableTab: React.FC<ScrollableTabProps> = ({
  kalima,
  verses,
  similars,
}) => {
  return (
    <ScrollableTabView>
      <View style={styles.view}>
        <View style={styles.headerContainer}>
          <Text style={styles.header} key="header">
            {verses[0].sourate} - {kalima}({verses.length + similars.length})
          </Text>
        </View>
        <View style={styles.verseList}>
          <VerseList verses={verses} key="verseList" similars={similars} />
        </View>
      </View>
    </ScrollableTabView>
  );
};

export default ScrollableTab;
