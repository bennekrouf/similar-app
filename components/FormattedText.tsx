import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {parseText} from './textParser';
import {I18nManager} from 'react-native';

function FormattedText({text}: {text: string; ayah: number}) {
  useEffect(() => {
    I18nManager.forceRTL(true);
  });
  const parts = parseText(text);

  return (
    <View>
      <Text style={styles.shit}>
        {parts.map((part, index) => (
          <Text key={index} style={part.isCommon && styles.specialText}>
            {' '}
            {` ${part.text}`}
          </Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    textAlign: 'right',
  },
  specialText: {
    color: 'red',
  },
  shit: {
    fontSize: 20,
    fontFamily: 'ScheherazadeNew-Regular',
  },
});

export default FormattedText;
