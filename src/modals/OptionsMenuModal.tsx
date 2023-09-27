import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import GenericModal from './GenericModal';
import {OptionsMenuModalProps} from './OptionsMenuModalProps';

import labels from './labels.json';

const OptionsMenuModal: React.FC<OptionsMenuModalProps> = ({ visible, onClose, onLogout }) => {
  const [selectedLabels, setSelectedLabels] = useState<{ [key: string]: boolean }>({});

  const handleLabelPress = (label: string) => {
    console.log(`${label} selected`);
    setSelectedLabels((prevLabels) => {
      return { ...prevLabels, [label]: !prevLabels[label] };
    });
  };

  const renderLabel = (label: string) => {
    const isSelected = selectedLabels[label];

    return (
      <TouchableOpacity
        key={label}
        style={[styles.entry, isSelected ? styles.selectedLabel : null]}
        onPress={() => handleLabelPress(label)}
      >
        <Text style={styles.labelText}>{label}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <GenericModal visible={visible} onClose={onClose} onLogout={onLogout} showFooter={true}>
      {/* Rendering the Other Divisions */}
      <View style={styles.section}>
        {labels?.otherDivisions.map((division, index) => renderLabel(division.name))}
      </View>

      {/* Rendering the Chapters */}
      <View style={styles.section}>
        {labels?.chapters.map((chapter, index) => renderLabel(chapter.name))}
      </View>
      {/* <View style={styles.separator} /> */}

      {/* Rendering the Quarters */}
      <View style={styles.section}>
        {labels?.quarters.map((quarter, index) => renderLabel(quarter.name))}
      </View>
    </GenericModal>
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
  }
});

export default OptionsMenuModal;