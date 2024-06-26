/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {VerseListProps} from '../../../models/interfaces';
import {View} from 'react-native';
import FormattedVerse from '../FormattedVerse';

const SimilarVerses: React.FC<VerseListProps> = ({verses, isOpposite}) => (
  <View style={[styles.similarsContainer]}>
    {verses.map(({text, sourate, backgroundColor, ayah, chapter_no}, index) => (
      <View key={index}>
        <View>
          {/* Similar Header */}
          <View style={styles.similarsHeader}>
            {/* Right column */}
            <View style={[styles.columnContainer]}>
              <View style={styles.columnNumber}>
                <Text style={styles.columnTextNumber}>
                  {`${chapter_no}:${ayah}`}
                </Text>
              </View>
            </View>
            {/* Left column */}
            <View
              style={[
                styles.columnContainer,
                styles.leftColumn,
                {backgroundColor: backgroundColor},
              ]}>
              <View style={[styles.column, {backgroundColor: 'black'}]}>
                <Text style={[styles.columnText, {textAlign: 'right'}]}>
                  {sourate}
                </Text>
              </View>
            </View>
          </View>

          {/* Similar Content */}
          <View style={styles.similarsContent}>
            <FormattedVerse text={text} ayah={ayah} isOpposite={isOpposite} />
          </View>
        </View>
      </View>
    ))}
  </View>
);

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
