import React, {useState} from 'react';
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
            {kalima} ({verses.length}) - {verses[0].sourate}
          </Text>
        </View>
        <View style={styles.verseList}>
          <VerseList verses={verses} key="verseList" similar=false/>
        </View>
        <Text> ------------------- </Text>
        <View style={styles.verseList}>
          <VerseList verses={similars} key="verseList" similar=true/>
        </View>
      </View>
    </ScrollableTabView>
  );
};

export default ScrollableTab;
