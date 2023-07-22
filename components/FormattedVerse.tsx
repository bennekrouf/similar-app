import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {parseText} from '../helpers.ts/textParser';
import {I18nManager} from 'react-native';

// Enable RTL support globally
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function FormattedVerse({text}: {text: string; ayah: number}) {
  useEffect(() => {
    I18nManager.forceRTL(true);
  });
  const parts = parseText(text);

  return (
    <View>
      <Text style={styles.verseStyle}>
        {parts.map((part, index) => (
          <Text key={index} style={part.isCommon && styles.specialText}>
            {' '}
            {` ${part.text}`}{' '}
          </Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    // textAlign: 'right',
  },
  specialText: {
    color: 'red',
    // textAlign: 'right', // Add the textAlign directly to the inner Text components
  },
  verseStyle: {
    fontSize: 20,
    fontFamily: 'ScheherazadeNew-Regular',
    // textAlign: 'right', // Add the textAlign directly to the inner Text components
  },
});

export default FormattedVerse;
