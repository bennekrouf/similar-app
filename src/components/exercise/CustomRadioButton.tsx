import React from 'react';
import { TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomRadioButton = ({ text, selected, onPress, serviceFailed, serviceValid }) => {
  const isSelectedAndValid = selected && serviceValid;
  const isSelectedAndFailed = selected && serviceFailed;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelectedAndFailed && styles.errorContainer,
        isSelectedAndValid && styles.validContainer,
      ]}
      onPress={onPress}>
      <Icon
        name={selected ? "radiobox-marked" : "radiobox-blank"}
        size={24}
        style={styles.radioIcon}
      />
      <Text style={[styles.text, I18nManager.isRTL && styles.textRTL]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row-reverse', // Changed to 'row-reverse' to right-align the radio button
    alignItems: 'center',
    justifyContent: 'flex-end' // Ensure elements are pushed to the right end
  },
  text: {
    fontFamily: 'ScheherazadeNew-Regular',
    fontSize: 18,
    marginLeft: 10, // Adjust margin for spacing between text and icon
  },
  textRTL: {
    textAlign: 'right',
  },
  radioIcon: {
    color: '#000',
  },
  errorContainer: {
    backgroundColor: '#f92323',
  },
  validContainer: {
    backgroundColor: '#09a009ff',
  },
});

export default CustomRadioButton;
