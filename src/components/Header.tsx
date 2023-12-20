import React, {useContext, useEffect, useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';

import { handleLogout } from '../storage/handleLogout';

import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import SouratesSelector from '../modals/SourateSelector/SouratesSelector';
import SourateBox from './SourateBox';
import labels from '../modals/SourateConfiguration/labels.json';
import { useChapters } from '../hooks/useFetchChapters';
import { UserState, initialState } from '../models/UserState';
import { onLabelSelect } from './onLabelSelect';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { getNamesByIndices } from '../modals/SourateConfiguration/getNamesByIndices';
import { currentStorage } from '../storage/currentStorage';

const souratesModal = 'souratesModal', settingsModal = 'settingsModal';

type HeaderProps = {
  exercises: any;
  userState: UserState;
  setUserState: any;
  loading: boolean;
};

const Header: React.FC<HeaderProps> = ({ exercises, userState, setUserState, loading }) => {
  const insets = useSafeAreaInsets();
  const { openModal, closeModal } = useMayoSettings();
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext) as UserContextType;
  const {chapters, isChapterLoading} = useChapters();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] = useState();
  
  const [selectedLabels, setSelectedLabels] = useState<string[]>();
  const onLabelClicked = (labelName: string) => {
    let newSelectedLabels = [];

    if (selectedLabels.includes(labelName)) {
      // If the label is already selected, remove it and its range from the selection
      const labelIndices = getIndicesByName([labelName]);
      newSelectedLabels = selectedLabels.filter(
        selected => !labelIndices.includes(getIndicesByName([selected])[0])
      );
    } else {
      // If the label is not selected, add it and its range to the selection
      // First, add the label itself
      newSelectedLabels = [...selectedLabels, labelName];
      // Then, calculate the indices for the new label and add any related labels
      const newIndicesList = getIndicesByName([labelName]);
      const relatedLabels = getNamesByIndices(newIndicesList).filter(
        related => !newSelectedLabels.includes(related)
      );
      newSelectedLabels.push(...relatedLabels);
    }
  
    setSelectedLabels(newSelectedLabels);
  };

  const handleChapterSelection = (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

  const handleLabelPress = async (chapter: {no: number | undefined}) => {
    closeModal(souratesModal);
    if (chapter.no) {
      setUserState({...userState, selectedChapter: chapter.no});
      try {
        await AsyncStorage.setItem('selectedChapter', chapter.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };

  useEffect(() => {
    const fetchInitialSettings = async () => {
      try {
        const res = await currentStorage();
        if(res?.knownSourates) {
          setSelectedLabels(res.knownSourates);
        }
        Logger.info('Fetched initial settings.', selectedLabels, { tag: 'Header:useEffect' });
      } catch (error) {
        Logger.error('Error fetching initial settings.', error, { tag: 'Header:useEffect' });
        throw error;
      }
    };

    if(user) fetchInitialSettings();
  }, [user]);

  useEffect(() => {
    const getCurrentIndexFromStorage = async () => {
      try {
        Logger.info('Fetching currentIndex from storage', { tag: 'LessonPages' });
        const storedCurrentIndex = await AsyncStorage.getItem('currentIndex');
        if (storedCurrentIndex) {
          setCurrentIndex(parseInt(storedCurrentIndex));
        }
      } catch (error) {
        Logger.error('Error retrieving currentIndex from AsyncStorage', error, { tag: 'LessonPages' });
      }
    };
    getCurrentIndexFromStorage();
  }, []);

  useEffect(() => {
    const getSelectedChapterFromStorage = async () => {
      try {
        Logger.info('Fetching selected chapter from storage', { tag: 'LessonPages' });
        const storedSelectedChapter = await AsyncStorage.getItem('selectedChapter');
        if (storedSelectedChapter) {
          setSelectedChapter(() => { parseInt(storedSelectedChapter) });
        }
      } catch (error) {
        Logger.error('Error retrieving selectedChapter from AsyncStorage', error, { tag: 'LessonPages' });
      }
    };

    // if (user) {
      getSelectedChapterFromStorage();
    // }
  }, []);

  // useEffect(() => {
  //   const onSignedOut = async () => {
  //     Logger.info('User signed out. Navigating to SignIn.', null, { tag: 'HomeScreen:onSignedOut' });
  //     navigation.navigate('SignIn');
  //   };
    
  //   authEvents.on('signedOut', onSignedOut);
    
  //   return () => {
  //     Logger.info('Cleanup: Removing signedOut event listener.', null, { tag: 'HomeScreen:useEffectCleanup' });
  //     authEvents.off('signedOut', onSignedOut);
  //   };
  // }, []);
  
  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  // Calculate the totals
  const totalGoodAnswers = Array.isArray(userState?.answerStats) ? userState?.answerStats.reduce((acc, stat) => acc + stat.g, 0) : 0;
  const totalWrongAnswers = Array.isArray(userState) ? userState?.answerStats.reduce((acc, stat) => acc + stat.w, 0) : 0;

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        <View style={styles.placeholderBox}></View>

        <TouchableOpacity onPress={() => openModal(souratesModal)}>
          <SourateBox chapterNo={userState.selectedChapter}/>
        </TouchableOpacity>

        {/* Header Box for the counts */}
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>G{totalGoodAnswers} W{totalWrongAnswers} T{exercises?.length}</Text>
        </View>

        {/* TouchableOpacity for the settings button */}
        <TouchableOpacity style={styles.optionsButton} onPress={() => openModal(settingsModal)}>
            <Text style={styles.optionsMenuText}>...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerSeparator} />

      {/* MayoSettingsModal for Settings */}
      <MayoSettingsModal
        id={settingsModal}
        onClose={() => closeModal(settingsModal)}
        onLogout={handleLogout}
        config={{
          headerTitle: 'Settings',
          logoutButtonText: 'Logout',
          showFooter: true,
        }}>
        <LabelsSelector
        labels={labels}
        selectedLabels={userState.knownSourates}
        onLabelSelect={onLabelSelect} />
      </MayoSettingsModal>

      {/* MayoSettingsModal for Selecting Sourates */}
      <MayoSettingsModal
        id={souratesModal}
        onClose={() => closeModal(souratesModal)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
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
    flex: 1, // Equal flex to the placeholderBox for symmetry
    alignItems: 'flex-end', // Align the button to the end of the container
    padding: 10,
  },
  optionsMenuText: {
      fontSize: 24,
  },
});
