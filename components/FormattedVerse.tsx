import {Text, StyleSheet, View} from 'react-native';
import {parseText} from '../helpers/textParser';

function FormattedVerse({text}: {text: string; ayah: number}) {
  const parts = parseText(text);

  return (
    <View>
      <Text style={styles.verseStyle}>
        {parts.map((part, index) => (
          <Text
            key={index}
            style={[
              part.isCommon && styles.commonText,
              part.isDifferent && styles.differentText,
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
  differentText: {
    color: 'red',
  },
  verseStyle: {
    fontSize: 20,
    fontFamily: 'ScheherazadeNew-Regular',
    textAlign: 'right',
  },
});

export default FormattedVerse;