import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchChapters from '../../hooks/useFetchChapters';

const sourateColor = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.background_color
const sourateName = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.sourate

const SourateBox: React.FC<{
  chapterNo: number;
  additionalStyles?: object;
}> = ({ chapterNo, additionalStyles }) => {
  useEffect(() => {

  }, []);

  const { chapters, isLoading } = useFetchChapters();
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
        <Text style={[styles.columnText, { textAlign: 'right' }]}>{sourateName(chapterNo, chapters)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
