// Verses.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VerseListProps} from '../models/interfaces';
import FormattedVerse from './FormattedVerse';

const Verses: React.FC<VerseListProps> = ({verses}) => (
  <View style={styles.versesContainer}>
    {verses.map(({text, background_color, ayah}, index) => (
      <View style={styles.rightAlignContainer} key={index}>
        <View>
          <Text style={styles.verse}>
            {' '}
            <FormattedVerse text={text} ayah={ayah} />
          </Text>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  verse: {
    fontFamily: 'ScheherazadeNew-Regular',
    fontSize: 25,
    // marginBottom: 35,
    marginBottom: 15, // Add some vertical spacing between verses
    textAlign: 'right',
  },
  rightAlignContainer: {
    alignItems: 'flex-end',
  },
  similarsContent: {
    paddingHorizontal: 10,
    fontSize: 30,
    fontFamily: 'ScheherazadeNew-Regular',
    paddingBottom: 40,
  },
  versesContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    // marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // New styles for the header and content
  similarsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  similarsContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 200,
  },
});

export default Verses;
