import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useChapters } from '../hooks/useFetchChapters';
import { I18nManager } from 'react-native';

const sourateColor = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.background_color
const sourateName = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.sourate

const SourateBox: React.FC<{
  chapterNo: number;
  count_ayat?: number, 
  additionalStyles?: object;
}> = ({ chapterNo, count_ayat, additionalStyles }) => {
  const { chapters, isLoading } = useChapters();
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  // console.log('const SourateBox: React.FC chapters:', chapters);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console.log(chapters);
  return (
    <View
      style={[
        styles.columnContainer,
        styles.leftColumn,
        { backgroundColor: sourateColor(chapterNo, chapters) },
        additionalStyles,
      ]}
    > 
      <View style={[styles.column, { backgroundColor: 'black' }]}>
      <Text style={[styles.columnText, { textAlign: 'right' }]}>
        {sourateName(chapterNo, chapters)}
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
