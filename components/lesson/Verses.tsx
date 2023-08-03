import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VerseListProps} from '../../models/interfaces';
import FormattedVerse from '../FormattedVerse';

const Verses: React.FC<VerseListProps> = ({verses}) => (
  <View style={styles.versesContainer}>
    {verses.map(({text, backgroundColor, ayah}, index) => (
      <View key={index} style={styles.verseContainer}>
        <Text style={styles.verse} allowFontScaling={false}>
          <FormattedVerse text={text} ayah={ayah} />
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  verseContainer: {
    marginVertical: 10, // Add margin to separate the cards
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verse: {
    fontFamily: 'ScheherazadeNew-Regular',
    fontSize: 25,
    marginBottom: 15,
    // The following properties will ensure RTL text is rendered correctly
    writingDirection: 'rtl',
    // textAlignVertical: 'center',
    textAlign: 'right', // Add the textAlign directly to the inner Text components
  },
  versesContainer: {
    margin: 10,
    padding: 10,
    // backgroundColor: 'white',
    // borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});

export default Verses;
