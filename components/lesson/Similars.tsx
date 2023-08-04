/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SimilarListProps} from '../../models/interfaces';
import {View} from 'react-native';
import FormattedVerse from './FormattedVerse';

const Similars: React.FC<SimilarListProps> = ({similars}) => (
  <View style={[styles.similarsContainer]}>
    {similars.map(({text, sourate, backgroundColor, ayah, chapter}, index) => (
      <View key={index}>
        <View>
          {/* Similar Header */}
          <View style={styles.similarsHeader}>
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

            {/* Right column */}
            <View style={[styles.columnContainer]}>
              <View style={styles.columnNumber}>
                <Text style={styles.columnTextNumber}>
                  {`${chapter}:${ayah}`}
                </Text>
              </View>
            </View>
          </View>

          {/* Similar Content */}
          <View style={styles.similarsContent}>
            <FormattedVerse text={text} ayah={ayah} />
          </View>
        </View>
      </View>
    ))}
  </View>
);

export default Similars;

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
    marginBottom: 200,
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
    flex: 1,
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
