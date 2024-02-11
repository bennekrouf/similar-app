import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

function FormattedVerse({ungroupedText, isOpposite}) {
  const discriminantStyle = isOpposite ? styles.differentTextWrong : styles.differentTextRight;

  return (
    <View>
      <Text style={styles.verseStyle}>
        {ungroupedText.pre}
        <Text style={discriminantStyle}>
          {ungroupedText.discriminant}
        </Text>
        {ungroupedText.post}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commonText: {
    color: 'blue',
  },
  differentTextRight: {
    color: '#0dc40d',
    fontWeight: 'bold',
  },
  differentTextWrong: {
    color: 'red',
  },
  verseStyle: {
    fontSize: 20,
    fontFamily: 'ScheherazadeNew-Regular',
    textAlign: 'right',
  },
});

export default FormattedVerse;
