import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SimilarListProps} from '../models/interfaces';
import {View} from 'react-native';
import FormattedVerse from './FormattedVerse';

const Similars: React.FC<SimilarListProps> = ({similars}) => (
  <View style={styles.similarsContainer}>
    {similars.map(({text, sourate, background_color, ayah}, index) => (
      <View style={styles.rightAlignContainer} key={index}>
        <View>
          {/* Similar Header */}
          <View style={styles.similarsHeader}>
            {/* Left column */}
            <View
              style={[
                styles.columnContainer,
                styles.leftColumn,
                {backgroundColor: background_color},
              ]}>
              <View style={styles.column}>
                <Text style={styles.columnText}>{sourate}</Text>
              </View>
            </View>

            {/* Right column */}
            <View style={[styles.columnContainer, styles.rightColumn]}>
              <View style={styles.columnNumbers}>
                <View style={styles.columnNumber}>
                  <Text style={styles.columnTextNumber}>{index + 1}</Text>
                </View>
                <View style={styles.columnNumber}>
                  <Text style={styles.columnTextNumber}>{ayah}</Text>
                </View>
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
  columnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  columnTextNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  columnNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    paddingVertical: 5,
    borderRadius: 1,
  },
  columnNumbers: {
    flexDirection: 'row',
  },
  columnContainer: {
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1,
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
