import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';
import { Sourate } from '../models/Sourate';
import { useChapters } from '../hooks/useFetchSourates';

const sourateColor = (chapterNo: number, sourates: Sourate[]) => sourates?.find(c => c.no === chapterNo)?.background_color
const sourateName = (chapterNo:number, sourates: Sourate[]) => sourates?.find(c => c.no === chapterNo)?.sourate

const SourateBox: React.FC<{
  chapterNo: number,
  count_ayat?: number, 
  additionalStyles?: object;
}> = ({ chapterNo, count_ayat, additionalStyles }) => {
  // I18nManager.forceRTL(true);
  const { sourates, isSourateLoading } = useChapters();
  
  return !isSourateLoading && (
    <View
      style={[
        styles.columnContainer,
        styles.leftColumn,
        { backgroundColor: sourateColor(chapterNo, sourates) },
        additionalStyles,
      ]}
    > 
      <View style={[styles.column, { backgroundColor: 'black' }]}>
        <Text style={[styles.columnText, { textAlign: 'right' }]}>
          {sourateName(chapterNo, sourates)}
          {count_ayat !== undefined ? ` (${count_ayat})` : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    padding: 3,
    borderRadius: 5,
    alignSelf: 'flex-start', // For aligning to the right in RTL
  },
  leftColumn: {
    backgroundColor: 'black',
  },
  column: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  columnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default SourateBox;
