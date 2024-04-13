import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VerseListProps} from '../../../models/interfaces';
import FormattedVerse from '../FormattedVerse';

const Verses: React.FC<VerseListProps> = ({verses}) => (
  <View style={styles.versesContainer}>
    {verses.map(({text, backgroundColor, ayah}, index) => (
      <View key={index} style={styles.verseContainer}>
        <Text style={styles.verse} allowFontScaling={false}>
          <FormattedVerse isOpposite={false} text={text} ayah={ayah} />
          <Text style={styles.ayahText}>[{ayah}]</Text>
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  ayahText: {
    fontSize: 18,
    lineHeight: 12, // New Line
    textAlign: 'right',
  },
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
    writingDirection: 'rtl',
    textAlign: 'right', // Add the textAlign directly to the inner Text components
  },
  versesContainer: {
    padding: 10,
  },
});

export default Verses;
