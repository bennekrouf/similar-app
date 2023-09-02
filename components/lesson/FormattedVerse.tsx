import {Text, StyleSheet, View} from 'react-native';
import {parseText} from '../../helpers/textParser';
import React from 'react';

function FormattedVerse({text, isOpposite}) {
  const parts = parseText(text, isOpposite);

  function determineStyle(part) {
    if (part.isCommon) {
      return styles.commonText;
    }
    if (part.isDifferent && !part.isOpposite) {
      return styles.differentTextRight;
    }
    if (part.isDifferent && part.isOpposite) {
      return styles.differentTextWrong;
    }

    return {};
  }

  return (
    <View>
      <Text style={styles.verseStyle}>
        {parts?.length &&
          parts?.map((part, index) => (
            <Text key={index} style={determineStyle(part)}>
              {`${part.text}`}
              {''}
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
