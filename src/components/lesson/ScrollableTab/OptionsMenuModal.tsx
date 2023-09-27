import React from 'react';
import {View, ScrollView, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

interface OptionsMenuModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const OptionsMenuModal: React.FC<OptionsMenuModalProps> = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
  visible={visible}
  animationType="slide"
  transparent={true}
  onRequestClose={onClose}>
  <View style={modalStyles.overlay}>
    <View style={modalStyles.container}>
      
      {/* Modal Header */}
      <View style={modalStyles.header}>
        <Text style={modalStyles.headerTitle}>Settings</Text>
        <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
          <Text style={{color: 'black', fontSize: 18}}>X</Text>
        </TouchableOpacity>
      </View>
      
      {/* Modal Content */}
      <ScrollView style={modalStyles.content}>
      </ScrollView>
      
      {/* Footer with Logout */}
      <TouchableOpacity style={modalStyles.footer} onPress={onLogout}>
        <Text style={{color: 'red', fontSize: 16}}>Logout</Text>
      </TouchableOpacity>
      
    </View>
  </View>
</Modal>


  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    maxHeight: '80%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  content: {
    backgroundColor: 'gray', // this is the gray content section
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OptionsMenuModal;