import {Text, StyleSheet, View} from 'react-native';
import {parseText} from '../../helpers/textParser';
import React from 'react';

function FormattedVerse({text, ayah, isOpposite}) {
  const parts = parseText(text, isOpposite);

  return (
    <View>
      <Text style={styles.verseStyle}>
        {parts.map((part, index) => (
          <Text
            key={index}
            style={[
              part.isCommon && styles.commonText,
              part.isDifferent && !part.isOpposite && styles.differentTextRight,
              part.isDifferent && part.isOpposite && styles.differentTextWrong,
            ]}>
            {` ${part.text}`}{' '}
          </Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commonText: {
    color: 'blue',
  },
  differentTextRight: {
    color: 'green',
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
