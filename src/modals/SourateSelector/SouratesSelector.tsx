/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import SourateBox from '../../components/SourateBox';
import { Sourate } from '../../models/Sourate';

interface SouratesSelectorProps {
  handleLabelPress: (sourate: {no: number | undefined}) => Promise<void>;
  sourates: Sourate[];
}

const SouratesSelector: React.FC<SouratesSelectorProps> = ({
  handleLabelPress,
  sourates,
}) => (
  <ScrollView>
    <View
      style={{
        padding: 20,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
      }}>
      {sourates?.map((sourate, index) => (
        <TouchableOpacity
          key={index}
          style={{
            borderRadius: 20,
            padding: 5,
            marginVertical: 5,
          }}
          onPress={() => handleLabelPress(sourate)}>
          <SourateBox chapterNo={sourate.no} count_ayat={sourate.count_ayat}/>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default SouratesSelector;
