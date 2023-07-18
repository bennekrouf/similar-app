import React from 'react';
import {Text, StyleSheet} from 'react-native';

function parseText(text) {
  const regex = /\[([^\]]+)\]/g;
  let parts = [];
  let start = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (start < match.index) {
      parts.push({text: text.slice(start, match.index)});
    }

    parts.push({text: match[1], isSpecial: true});
    start = regex.lastIndex;
  }

  if (start < text.length) {
    parts.push({text: text.slice(start)});
  }

  return parts;
}

function FormattedText({text}) {
  const parts = parseText(text);

  return (
    <Text style={styles.baseText}>
      {parts.map((part, index) => (
        <Text key={index} style={part.isSpecial && styles.specialText}>
          {part.text}
        </Text>
      ))}
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
