import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VerseListProps} from '../../models/interfaces';
import FormattedVerse from './FormattedVerse';
import {Button, Text, Card, Provider, DefaultTheme} from 'react-native-paper';

const MainVerses: React.FC<VerseListProps> = ({verses}) => (
  <View style={styles.versesContainer}>
    {verses.map(({text, ayah}, index) => (
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <View>
              <FormattedVerse isOpposite={false} text={text} />
            </View>
            <View style={styles.ayahContainer}>
              <Text style={styles.ayahText}>[{ayah}]</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '95%', // Set the card width to almost full screen width
    alignSelf: 'center', // Center the card
    backgroundColor: 'white',
    marginBottom: 10,
  },
  ayahText: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'right',
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
    writingDirection: 'rtl',
    textAlign: 'right', // Add the textAlign directly to the inner Text components
  },
  versesContainer: {
    margin: 10,
    padding: 10,
  },
});

export default MainVerses;
