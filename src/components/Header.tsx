import React, {useContext, useState, useEffect} from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';

import { RootStackParamList } from '../models/interfaces';
import { handleLogout } from '../storage/handleLogout';

import labels from '../modals/SourateConfiguration/labels.json';
import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import { handleLabelSelect } from '../modals/SourateConfiguration/handleLabelSelect/handleLabelSelect';
import SouratesSelector from '../modals/SourateSelector/SouratesSelector';
import SourateBox from './SourateBox';
import { usePersistedState } from '../hooks/usePersistState';
import { useChapters } from '../hooks/useFetchChapters';

const initialState = [];

const Header = ({ stats, contents }) => {
  const insets = useSafeAreaInsets();
  const { openModal, closeModal } = useMayoSettings();
  // const [isSouratesModalOpen, setIsSouratesModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { authEvents } = useContext(UserContext) as UserContextType;
  const {chapters, isLoading} = useChapters();

  const { handleOpenMayoSettings, isMayoSettingsOpen, handleCloseMayoSettings } = useMayoSettings();
  const [selectedLabels, setSelectedLabels] = usePersistedState<string[]>(initialState);
  const onLabelClicked = (labelName: string) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName);
  };

  const handleChapterSelection = (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

  const handleLabelPress = async (chapter: {no: number | undefined}) => {
    souratesModal.closeModal();
    if (chapter.no) {
      handleChapterSelection({no: chapter.no});

      try {
        await AsyncStorage.setItem('selectedChapter', chapter.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };

  useEffect(() => {
    const onSignedOut = async () => {
      Logger.info('User signed out. Navigating to SignIn.', null, { tag: 'HomeScreen:onSignedOut' });
      navigation.navigate('SignIn');
    };
    
    authEvents.on('signedOut', onSignedOut);
    
    return () => {
      Logger.info('Cleanup: Removing signedOut event listener.', null, { tag: 'HomeScreen:useEffectCleanup' });
      authEvents.off('signedOut', onSignedOut);
    };
  }, []);

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        <View style={styles.placeholderBox}></View>

        {contents?.length && <TouchableOpacity onPress={() => openModal('souratesModal')}>
          <SourateBox chapterNo={contents[0]?.verses[0]?.chapter_no} />
        </TouchableOpacity>}

        {/* Header Box for the counts */}
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>G{stats.goodCount} W{stats.wrongCount} T{stats.count}</Text>
        </View>

        {/* TouchableOpacity for the settings button */}
        <TouchableOpacity style={styles.optionsButton} onPress={() => openModal('settingsModal')}>
            <Text style={styles.optionsMenuText}>...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerSeparator} />

      {/* MayoSettingsModal for Settings */}
      <MayoSettingsModal
        id='settingsModal'
        onClose={() => closeModal('settingsModal')}
        onLogout={handleLogout}
        config={{
          headerTitle: 'Settings',
          logoutButtonText: 'Logout',
          showFooter: true,
        }}>
        <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
      </MayoSettingsModal>

      {/* MayoSettingsModal for Selecting Sourates */}
      <MayoSettingsModal
        id='souratesModal'
        onClose={() => closeModal('souratesModal')}
        config={{
          headerTitle: 'Select Sourate',
        }}>
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
