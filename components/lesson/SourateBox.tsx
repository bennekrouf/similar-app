import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchChapters from '../../hooks/useFetchChapters';

const sourateColor = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.background_color
const sourateFontColor = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.color
const sourateName = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.sourate
const sourateIsMekka = (chapterNo, chapters) => chapters?.find(c => c.no === chapterNo)?.mekka;

const SourateBox: React.FC<{
  chapterNo: number;
  count_ayat?: number, 
  additionalStyles?: object;
}> = ({ chapterNo, count_ayat, additionalStyles }) => {
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
    <View style={{position: 'relative'}}>
      {sourateIsMekka(chapterNo, chapters) && 
        <View style={styles.bubble}/>
      }

      <View
        style={[
          styles.columnContainer,
          styles.leftColumn,
          { backgroundColor: sourateColor(chapterNo, chapters) },
          additionalStyles,
        ]}
      > 
        <View style={[styles.column]}>
          <Text style={[styles.columnText, { textAlign: 'right' }, {color: sourateFontColor(chapterNo, chapters)}]}>
            {sourateName(chapterNo, chapters)}
            {count_ayat !== undefined ? ` (${count_ayat})` : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    padding: 3,
    borderRadius: 5,
  },
  leftColumn: {
    backgroundColor: 'black',
  },
  column: {
    padding: 5,
    borderRadius: 5,
  },
  columnText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  bubble: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});

export default SourateBox;
