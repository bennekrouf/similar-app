import React from 'react';
import {ScrollView, Text} from 'react-native';
import {VerseListProps} from './interfaces';
import styles from './styles';
import {View} from 'react-native';
import FormattedText from './FormattedText';

const VerseList: React.FC<VerseListProps> = ({verses, similars}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.versesContainer}>
      {verses.map(({text, background_color, ayah}, index) => (
        <View style={styles.rightAlignContainer} key={index}>
          <View>
            <Text style={styles.verse}>
              <Text> </Text>
              <View
                style={[{backgroundColor: background_color, borderRadius: 50}]}>
                <Text>{': '}</Text>
              </View>
              <FormattedText text={text} ayah={ayah} />
            </Text>
          </View>
        </View>
      ))}
    </View>

    <View style={styles.similarsContainer}>
      {similars.map(({text, sourate, background_color, ayah}, index) => (
        <View style={styles.rightAlignContainer} key={index}>
          <View>
            <Text style={styles.verse}>
              <View
                style={[
                  styles.sourateLabel,
                  {backgroundColor: 'red', borderRadius: 20},
                ]}>
                <Text>{` ${index + 1} - ${sourate} : `}</Text>
              </View>
              <FormattedText text={text} ayah={ayah} />
            </Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

export default VerseList;
