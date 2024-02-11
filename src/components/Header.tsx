import React, {useContext, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';

import { handleLogout } from '../storage/handleLogout';

import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import SouratesSelector from '../modals/SourateSelector/SouratesSelector';
import SourateBox from './SourateBox';
import labels from '../modals/SourateConfiguration/labels.json';
import { useChapters } from '../hooks/useFetchSourates';
import { UserState } from '../models/UserState';
import { onSourateSelect } from '../utils/onSourateSelect';
import ProgressBar from './ProgressBar';
import { CurrentScreenContext } from '../hooks/CurrentScreenContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/RootStackParamList';
import { useCurrentIndexFromStorage } from '../hooks/useCurrentIndexFromStorage';
import { useInitialSettings } from '../hooks/useInitialSettings';
import { useSelectedChapterFromStorage } from '../hooks/useSelectedSourateFromStorage';
import { HeaderProps } from '../models/HeaderProps';

const souratesModal = 'souratesModal', settingsModal = 'settingsModal';

const Header: React.FC<HeaderProps> = ({ 
  userState, setUserState, loading, count, goodCount, wrongCount, onSelectExercise,
}) => {
  const { currentScreen } = useContext(CurrentScreenContext);
  
  const isExerciseScreen = currentScreen === 'Exercise';
  const isLessonScreen = currentScreen === 'Lesson';
  const isHomeScreen = currentScreen === 'Home';

  const displaySelectedChapter = !isHomeScreen && !isExerciseScreen && isLessonScreen;
  const displayProgress = !isHomeScreen && !isExerciseScreen && !isLessonScreen;

  const insets = useSafeAreaInsets();

  const { openModal, closeModal } = useMayoSettings();
  const { user } = useContext(UserContext) as UserContextType;
  const {sourates, triggerChapterFetch, isSourateLoading} = useChapters();
  const selectedChapter = useSelectedChapterFromStorage();
  const [currentPage, setCurrentPage] = useState('Lesson');
  const selectedSourates = useInitialSettings();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleLabelPress = async (sourate: {no: number | undefined}) => {
    closeModal(souratesModal);
    if (sourate.no) {
      setUserState({...userState, selectedChapter: sourate.no});
      try {
        await AsyncStorage.setItem('selectedChapter', sourate.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };
  
  useCurrentIndexFromStorage();

  const handleTogglePage = () => {
    if (currentScreen === 'Exercise') {
      setCurrentPage('Lesson');
      onTogglePage('Lesson');
    } else {
      setCurrentPage('Exercise');
      onTogglePage('Exercise');
    }
  };

  const onTogglePage = (page) => {
    if (page === 'Exercise') {
      navigation.navigate('Lesson');
    } else {
      navigation.navigate('Exercise');
    }
  };
  
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
          <Image source={require('../../assets/mayologo.jpg')} style={styles.logo} />
      </View>
    );
  }

  const answeredCount = goodCount + wrongCount;
  const totalProgress = count > 0 ? (answeredCount / count) : 0;
  const goodFlex = totalProgress > 0 ? (goodCount / answeredCount) : 0;
  const wrongFlex = totalProgress > 0 ? (wrongCount / answeredCount) : 0;

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        {/* <View style={styles.placeholderBox}></View> */}

        <TouchableOpacity 
          onPress={onSelectExercise}
          style={[styles.toggleButton, styles.roundedButton]}
        >
          <FontAwesomeIcon 
            icon={isExerciseScreen ?  faGraduationCap:faBook} 
            size={20} 
            style={styles.iconStyle} 
          />
        </TouchableOpacity>

        {displaySelectedChapter && (
          <TouchableOpacity onPress={() => openModal(souratesModal)}>
            <SourateBox chapterNo={userState.selectedChapter}/>
          </TouchableOpacity>
        )}

        {/* Header Box for the counts
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>G{goodCount} W{wrongCount} T{count}</Text>
          </View> 
        */}

        {displayProgress && (
          <View style={styles.progressBarContainer}>
           <ProgressBar totalProgress={totalProgress} goodProgress={goodCount} />
          </View>
        )}

        {/* TouchableOpacity for the settings button */}
        <TouchableOpacity onPress={() => openModal(settingsModal)}>
          <FontAwesomeIcon icon={faCog} size={24} style={[styles.settingsIcon, styles.roundedButton]} />
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
          displayName: user.displayName,
          photoURL: user.photoURL
        }}>
        <LabelsSelector
          labels={labels}
          selectedSourates={userState?.ranges}
          onSourateSelect={onSourateSelect}
          userState={userState}
          setUserState={setUserState}
          triggerChapterFetch={triggerChapterFetch}
        />
      </MayoSettingsModal>

      {/* MayoSettingsModal for Selecting Sourates */}
      <MayoSettingsModal
        id={souratesModal}
        onClose={() => closeModal(souratesModal)}
        config={{
          headerTitle: 'Select Sourate',
        }}>
        <SouratesSelector handleLabelPress={handleLabelPress} sourates={sourates} />
      </MayoSettingsModal>
    </View>
  );
};

export default Header;



const styles = StyleSheet.create({
  roundedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Example background color
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  iconStyle: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  progressBarContainer: {
    height: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingsIcon: {
    color: '#000', // or any color that suits your app theme
    padding: 20, // adjust padding as needed
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  toggleButton: {
    padding: 10,
  }
});
