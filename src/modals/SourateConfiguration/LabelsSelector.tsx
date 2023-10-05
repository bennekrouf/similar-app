import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const LabelsSelector = ({ labels, selectedLabels, onLabelSelect }) => {
  // console.log(`LabelsSelector is called with 1 ${labels} 2 ${selectedLabels} 3 ${onLabelSelect}`);
  return (
    <>
      {/* Rendering the Other Divisions */}
      <View style={styles.section}>
        {labels?.otherDivisions.map((chapter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.entry, selectedLabels[chapter.name] ? styles.selectedLabel : {}]}
            onPress={() => onLabelSelect(chapter.name)}>
            <Text style={styles.labelText}>{chapter.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
       {/* Rendering the Chapters */}
       <View style={styles.section}>
      {labels?.chapters.map((chapter, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.entry, selectedLabels[chapter.name] ? styles.selectedLabel : {}]} 
          onPress={() => onLabelSelect(chapter.name)}
        >
          <Text style={styles.labelText}>{chapter.name}</Text>
        </TouchableOpacity>
      ))}
      </View>
      {/* <View style={styles.separator} /> */}

      {/* Rendering the Quarters */}
      <View style={styles.section}>
      {labels?.quarters.map((quarter, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.entry, selectedLabels[quarter.name] ? styles.selectedLabel : {}]} 
          onPress={() => onLabelSelect(quarter.name, quarter.start, quarter.end)}
        >
          <Text style={styles.labelText}>{quarter.name}</Text>
        </TouchableOpacity>
      ))}
      </View>
    </>
  );
};

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
