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
        I18nManager.isRTL && styles.containerRTL,
        isSelectedAndFailed && styles.errorContainer,
        isSelectedAndValid && styles.validContainer,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, I18nManager.isRTL && styles.textRTL]}>
        {text}
      </Text>
      {selected ? (
        <Icon
          name={selected ? "radiobox-marked" : "radiobox-blank"}
          size={24}
          style={[styles.radioIcon]}
        />
      ) : (
        <Icon name="radiobox-blank" size={24} style={styles.radioIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textRTL: {
    textAlign: 'right',
  },
  container: {
    marginTop: 20,
    // marginRight: 15,
    borderRadius: 5,
    padding: 10,
    // flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    // flexDirection: 'row-reverse'
  },
  containerRTL: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'ScheherazadeNew-Regular',
    // textAlign: 'right',
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
