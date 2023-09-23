/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  PanResponderInstance,
  // GestureResponderEvent,
} from 'react-native';
import SourateBox from './SourateBox';
import useFetchChapters from '../../hooks/useFetchChapters';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  handleLabelPress: (chapter: {no: number | undefined}) => Promise<void>; // Add the handleLabelPress prop
  panResponder: PanResponderInstance;
}

const ChapterSelectionModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  handleLabelPress,
  panResponder,
}) => {
  const {chapters, isLoading} = useFetchChapters();
  // console.log('Chapters in ChapterSelectionModal : ', chapters);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}>
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <View
        style={{backgroundColor: 'white', maxHeight: '80%'}}
        {...panResponder.panHandlers}>
        {/* Modal Content */}
        <ScrollView>
          <View
            style={{
              padding: 20,
              flexDirection: 'row-reverse',
              flexWrap: 'wrap',
            }}>
            {chapters?.map((chapter, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderRadius: 20,
                  padding: 5,
                  marginVertical: 5,
                }}
                onPress={() => handleLabelPress(chapter)}>
                <SourateBox chapterNo={chapter.no} count_ayat={chapter.count_ayat}/>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* Close Button */}
        <TouchableOpacity style={{marginTop: 20}} onPress={onClose}>
          <Text style={{color: 'black', fontSize: 14}}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default ChapterSelectionModal;
