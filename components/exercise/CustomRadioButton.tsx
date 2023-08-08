import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You will need to install this library

const CustomRadioButton = ({text, selected, onPress, serviceFailed, serviceValid}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {selected ? (
        <Icon name="radiobox-marked" size={24} color="#2a10cf" />
      ) : (
        <Icon name="radiobox-blank" size={24} color="#000" />
      )}
      <Text
        style={[
          styles.text,
          serviceFailed && !selected ? styles.errorBackground : {},
          serviceValid && selected ? styles.validBackground : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 15,
  },
  text: {
    fontFamily: 'ScheherazadeNew-Regular',
    textAlign: 'right',
    fontSize: 18,
    color: '#000',
    marginRight: 10,
  },
  errorBackground: {
    backgroundColor: '#f92323',
    color: 'white',
  },
  validBackground: {
    backgroundColor: 'green',
  },
});

export default CustomRadioButton;
