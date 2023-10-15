import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const LabelsSelector = ({ labels, selectedLabels, onLabelSelect }) => {

  const renderLabelsSection = (labelList) => (
    <View style={styles.section}>
      {labelList?.map((item, index) => (
        <LabelEntry 
          key={index}
          item={item}
          isSelected={selectedLabels?.includes(item.name)}
          onSelect={() => onLabelSelect(item.name, item.start, item.end)}
        />
      ))}
    </View>
  );
  
  // console.log(`LabelsSelector is called with 1 ${labels} 2 ${selectedLabels} 3 ${onLabelSelect}`);
  return (
    <View>
    {renderLabelsSection(labels?.otherDivisions)}
    {renderLabelsSection(labels?.chapters)}
    {renderLabelsSection(labels?.quarters)}
  </View>
  );
};

const LabelEntry = ({ item, isSelected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.entry, isSelected ? styles.selectedLabel : {}]} 
    onPress={onSelect}>
    <Text style={styles.labelText}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10,
    marginBottom: 10
  },
  labelText: {
    textAlign: 'right'
  },
  entry: {
    padding: 10,
    marginLeft: 7,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    borderColor: 'transparent',
    borderWidth: 2
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
  },
  selectedLabel: {
    backgroundColor: '#b0b0b0',
    borderColor: '#8a8a8a',
    color: 'white'
  },
  selectedLabelTextColor: {
    color: 'white'
  }
});

export default LabelsSelector;
