import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import _ from 'lodash';

const LabelsSelector = ({ labels, selectedLabels, onLabelSelect }) => {
  const groupedLabels = _.groupBy(labels, 'section');
  const renderLabelsSection = (labelList) => (
    <View style={styles.section}>
      {labelList?.reverse().map((item:any, index:number) => (
        <LabelEntry 
          key={index}
          item={item}
          isSelected={selectedLabels?.includes(item.name)}
          onSelect={() => onLabelSelect(item.name)}
        />
      ))}
    </View>
  );
  
  return (
    <View>
    {Object.entries(groupedLabels).map(([sectionName, labelList]) => (
      <View key={sectionName}>
        {/* <Text style={styles.sectionTitle}>{sectionName}</Text> */}
        {renderLabelsSection(labelList)}
      </View>
    ))}
  </View>
  );
};

const indiq = (item) => {
  return item.end === item.start ? `${item.end}` : `${item.end}-${item.start}`;
}

const LabelEntry = ({ item, isSelected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.entry, isSelected ? styles.selectedLabel : {}]} 
    onPress={onSelect}>
    <View style={styles.labelContent}>
      <Text style={styles.labelText}>{item.name}</Text>
      {/* Additional Text for start-end */}
      <Text style={styles.smallText}>{indiq(item)}</Text>
    </View>
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
    textAlign: 'center',
    marginBottom: 2,
  },
  labelContent: {
    alignItems: 'center',
  },
  smallText: {
    fontSize: 10, // Smaller font size
    color: '#666', // Less prominent color
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
  },
  sectionTitle: {
    textAlign: 'right', // For RTL alignment
    fontWeight: 'bold', // If you want the title to be bold
    fontSize: 18, // Set the font size according to your design
    paddingVertical: 5, // Add some vertical padding
    paddingHorizontal: 10, // Add some horizontal padding for better spacing
    color: 'black', // Set the color for the title text
    backgroundColor: 'white', // Set the background color for the title area if necessary
  }
});

export default LabelsSelector;
