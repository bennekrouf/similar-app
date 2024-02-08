import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card} from 'react-native-paper';

import {VerseListProps} from '../../../../models/VerseListProps';
import FormattedVerse from '../../FormattedVerse';

const MainVerses: React.FC<VerseListProps> = ({verses}) => (
  <View style={styles.versesContainer}>
    {verses.map(({ungrouped_text, verse_no}, index) => (
      <View key={index}>
        <Card style={styles.card}>
          <Card.Content>
            <View>
              <FormattedVerse isOpposite={false} ungroupedText={ungrouped_text} />
            </View>
            <View style={styles.ayahContainer}>
              <Text style={styles.ayahText}>[{verse_no}]</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%', // Set the card width to almost full screen width
    alignSelf: 'center', // Center the card
    backgroundColor: 'white',
    marginBottom: 10,
  },
  ayahText: {
    fontSize: 12,
    lineHeight: 20,
    // textAlign: 'right',
  },
  ayahContainer: {
    flexDirection: 'row', // Ensures items are horizontally aligned
    justifyContent: 'flex-start', // Aligns items to the start/left
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
    // writingDirection: 'rtl',
    textAlign: 'right',
  },
  versesContainer: {
    margin: 10,
    padding: 10,
  },
});

export default MainVerses;
