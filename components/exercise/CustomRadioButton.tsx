import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomRadioButton = ({
  text,
  selected,
  onPress,
  serviceFailed,
  serviceValid,
}) => {
  const isSelectedAndValid = selected && serviceValid;
  const isSelectedAndFailed = selected && serviceFailed;

  console.log('Inside radio button text: ', text);
  // console.log('Inside radio button selected: ', selected);
  // console.log('Inside radio serviceValid: ', serviceFailed, serviceValid);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelectedAndFailed && styles.errorContainer,
        isSelectedAndValid && styles.validContainer,
      ]}
      onPress={onPress}>
      {selected ? (
        <Icon
          name="radiobox-marked"
          size={24}
          style={[
            styles.radioIcon,
            isSelectedAndValid && styles.validIcon && styles.textColorValid,
          ]}
        />
      ) : (
        <Icon name="radiobox-blank" size={24} style={styles.radioIcon} />
      )}
      <Text style={[styles.text, isSelectedAndValid && styles.textColorValid]}>
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
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontFamily: 'ScheherazadeNew-Regular',
    textAlign: 'right',
    fontSize: 18,
    // color: '#000',
    marginRight: 10,
  },
  radioIcon: {
    color: '#000',
  },
  validIcon: {
    color: '#000400',
  },
  textColorValid: {
    color: '#ffffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorContainer: {
    backgroundColor: '#f92323',
  },
  validContainer: {
    backgroundColor: '#09a009ff',
    color: 'white',
  },
});

export default CustomRadioButton;
