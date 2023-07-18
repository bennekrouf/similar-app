import React from 'react';
import {ScrollView, Text} from 'react-native';
import {VerseListProps} from './interfaces';
import styles from './styles';
import {View} from 'react-native';
import FormattedText from './FormattedText';

const VerseList: React.FC<VerseListProps> = ({verses, similars}) => (
  <ScrollView contentContainerStyle={styles.container}>
    {verses.map(({text, sourate, background_color}, index) => (
      <View style={styles.rightAlignContainer} key={index}>
        <View style={[{borderRadius: 50}]}>
          <Text style={styles.verse}>
            <Text>{` ${index + 1} - ${sourate} `}</Text> {' '} : <FormattedText text={text} />
          </Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default VerseList;
