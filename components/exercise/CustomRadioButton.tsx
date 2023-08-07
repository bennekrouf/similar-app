import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You will need to install this library

const CustomRadioButton = ({text, selected, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {selected ? (
        <Icon name="radiobox-marked" size={24} color="#2a10cf" />
      ) : (
        <Icon name="radiobox-blank" size={24} color="#000" />
      )}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse', // This will align the items to the right
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginRight: 10, // Change to marginLeft if you want to add some space between the text and the radio button
  },
});

export default CustomRadioButton;
