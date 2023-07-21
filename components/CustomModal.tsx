// CustomModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { PanResponderInstance } from 'react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  chapters: any[];
  handleLabelPress: (chapter: { no: number | undefined }) => void;
  panResponder: PanResponderInstance;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  chapters,
  handleLabelPress,
  panResponder,
}) => {
  const handlePanResponderRelease = (
    evt: any,
    gestureState: { dy: number }
  ) => {
    // Check if the user has swiped down by a certain threshold
    if (gestureState.dy > 100) {
      onClose();
    }
  };

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
          style={{ backgroundColor: 'white', minHeight: '80%' }}
          {...panResponder.panHandlers}>
          {/* Modal Content */}
          <View style={{ padding: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
            {chapters.map((chapter, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'lightgrey',
                  borderRadius: 20,
                  padding: 5,
                  marginVertical: 5,
                }}
                onPress={() => handleLabelPress(chapter)}>
                <Text>{`${chapter.name} (${chapter.count})`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Close Button */}
          <TouchableOpacity style={{ marginTop: 20 }} onPress={onClose}>
            <Text style={{ color: 'black', fontSize: 14 }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
