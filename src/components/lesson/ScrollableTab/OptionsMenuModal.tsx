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
          <TouchableOpacity style={modalStyles.logoutButton} onPress={onLogout}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
    width: 30, // Define a fixed width
    height: 30, // Define a fixed height
    backgroundColor: 'rgba(200,200,200,0.3)', // Light gray background color with a little transparency
    borderRadius: 15, // Half of the width and height to make it round
    justifyContent: 'center', // Center the "X" vertically
    alignItems: 'center', // Center the "X" horizontally
  },
  closeButtonText: {
    color: 'black',
    fontSize: 14,
  },
  content: {
    minHeight: 600,
    padding: 10,
  },
  logoutButton: {
    padding: 30,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  logoutButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default OptionsMenuModal;