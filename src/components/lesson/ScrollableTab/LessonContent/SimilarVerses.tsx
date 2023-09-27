/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {VerseListProps} from '../../../../models/interfaces';
import {View} from 'react-native';
import FormattedVerse from '../../FormattedVerse';
import SourateBox from '../../../SourateBox';

const SimilarVerses: React.FC<VerseListProps> = ({verses, isOpposite}) => {

  return (
  <View style={[styles.similarsContainer]}>
    {verses.map(
      ({ungrouped_text, verse_no, chapter_no}, index) => (
        <View key={index}>
          {/* Similar Header */}
          <View style={styles.similarsHeader}>
            {/* Right column */}
            <View style={styles.columnContainer}>
              <View style={styles.columnNumber}>
                <Text style={styles.columnTextNumber}>
                  {`${chapter_no}:${verse_no}`}
                </Text>
              </View>
            </View>
            {/* Left column */}
            <SourateBox chapterNo={chapter_no} />
          </View>

          {/* Similar Content */}
          <View style={styles.similarsContent}>
            <FormattedVerse
              ungroupedText={ungrouped_text}
              isOpposite={isOpposite}
            />
          </View>
        </View>
      ),
    )}
  </View>
)};

export default SimilarVerses;

const styles = StyleSheet.create({
  column: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  columnNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderRadius: 2,
    paddingHorizontal: 5, // Add space to left and right
    paddingVertical: 0, // No space above and below
  },
  columnTextNumber: {
    fontSize: 12,
    lineHeight: 12, // New Line
    textAlign: 'right',
  },
  similarsContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 50,
    marginRight: 20,
    marginLeft: 20,
  },
  similarWrapper: {
    marginBottom: 2,
    paddingHorizontal: 2,
  },
  similarsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  columnContainer: {
    width: '20%', // Set fixed width for the columns
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 5,
  },
  leftColumn: {
    backgroundColor: 'black',
  },
  columnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  similarsContent: {
    paddingHorizontal: 10,
    fontSize: 30,
    fontFamily: 'ScheherazadeNew-Regular',
    paddingBottom: 40,
  },
});
