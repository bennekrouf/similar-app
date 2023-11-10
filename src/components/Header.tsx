import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';
import { handleLogout } from '../storage/handleLogout';
import labels from '../modals/SourateConfiguration/labels.json';
import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import { usePersistedState } from '../hooks/usePersistState';
import { handleLabelSelect } from '../modals/SourateConfiguration/handleLabelSelect/handleLabelSelect';
import SouratesSelector from '../modals/SourateSelector/SouratesSelector';
import SourateBox from './SourateBox';

const initialState = [];

const Header = ({ count, goodCount, wrongCount, contents }) => {
  const insets = useSafeAreaInsets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);

  const { handleOpenMayoSettings, isMayoSettingsOpen, handleCloseMayoSettings } = useMayoSettings();
  const [selectedLabels, setSelectedLabels] = usePersistedState<string[]>(initialState);
  const onLabelClicked = (labelName: string) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName);
  };

  const handleOpenSouratesModal = () => {
    setIsModalOpen(true);
  };

  const handleChapterSelection = (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

  const handleLabelPress = async (chapter: {no: number | undefined}) => {
    handleCloseSouratesModal();
    if (chapter.no) {
      handleChapterSelection({no: chapter.no});

      try {
        await AsyncStorage.setItem('selectedChapter', chapter.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };

  const handleCloseSouratesModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        <View style={styles.placeholderBox}></View>

        {contents?.length && <TouchableOpacity onPress={handleOpenSouratesModal}>
          <SourateBox chapterNo={contents[0]?.chapter_no} />
        </TouchableOpacity>}

        {/* Header Box for the counts */}
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>G{goodCount} W{wrongCount} T{count}</Text>
        </View>

        {/* TouchableOpacity for the settings button */}
        <TouchableOpacity style={styles.optionsButton} onPress={handleOpenMayoSettings}>
            <Text style={styles.optionsMenuText}>...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerSeparator} />

      <MayoSettingsModal
        visible={isMayoSettingsOpen}
        onClose={handleCloseMayoSettings}
        onLogout={handleLogout}
        config={{
          headerTitle: 'Settings',
          logoutButtonText: 'Custom Logout',
          showFooter: true,
        }} >
        <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
      </MayoSettingsModal>

      <MayoSettingsModal
          visible={isMayoSettingsOpen}
          onClose={handleCloseMayoSettings}
          config={{
            headerTitle: 'Select sourate',
          }}
        >
          <SouratesSelector handleLabelPress={handleLabelPress} chapters={chapters} />
        </MayoSettingsModal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
      fontWeight: 'bold',
  },
  placeholderBox: {
    flex: 0.2, // This takes up space just like the headerBox, but it's invisible
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusts items to the start and end of the container
    alignItems: 'center',
    paddingBottom: 10,
  },
  header: {
    flex: 1, // Takes up as much space as possible
    justifyContent: 'center', // Horizontally center the headerText within headerBox
    alignItems: 'center', // Vertically center the headerText within headerBox (if needed)
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 5,
  },
  headerBox: {
    flex: 1,
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    padding: 5,
    borderRadius: 5,
  },
  headerCount: {
    fontWeight: 'bold',
  },
  headerSeparator: {
    height: 1, // Height of separator line
    backgroundColor: 'grey', // Color of separator line
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android shadow
  },
  optionsButton: {
    padding: 10,
  },
  optionsMenuText: {
      fontSize: 24,
  },
});
