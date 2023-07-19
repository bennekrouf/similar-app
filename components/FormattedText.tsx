import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {parseText} from './textParser';

function FormattedText({text, ayah}) {
  const parts = parseText(text);

  return (
    <Text style={styles.baseText}>
      {parts.map((part, index) => (
        <Text key={index} style={part.isCommon && styles.specialText}>
          {part.text}
        </Text>
      ))}
      ({ayah})
    </Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    textAlign: 'right',
  },
  specialText: {
    color: 'red',
  },
});

export default FormattedText;
