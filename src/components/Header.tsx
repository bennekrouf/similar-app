import React, {useContext, useEffect, useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

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
import { RootStackParamList } from '../models/RootStackParamList';
import ProgressBar from './ProgressBar';

const souratesModal = 'souratesModal', settingsModal = 'settingsModal';

type HeaderProps = {
  exercises: any;
  userState: UserState;
  setUserState: any;
  loading: boolean;
  count: number,
  goodCount:number,
  wrongCount:number,
  onTogglePage: any,
};

const Header: React.FC<HeaderProps> = ({ exercises, userState, setUserState, loading, count, goodCount, wrongCount, onTogglePage }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { openModal, closeModal } = useMayoSettings();
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext) as UserContextType;
  const {chapters, isChapterLoading} = useChapters();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] = useState();
  const [currentPage, setCurrentPage] = useState('Lesson');
  
  const [selectedLabels, setSelectedLabels] = useState<string[]>();
  // const onLabelClicked = (labelName: string) => {
  //   let newSelectedLabels = [];

  //   if (selectedLabels.includes(labelName)) {
  //     // If the label is already selected, remove it and its range from the selection
  //     const labelIndices = getIndicesByName([labelName]);
  //     newSelectedLabels = selectedLabels.filter(
  //       selected => !labelIndices.includes(getIndicesByName([selected])[0])
  //     );
  //   } else {
  //     // If the label is not selected, add it and its range to the selection
  //     // First, add the label itself
  //     newSelectedLabels = [...selectedLabels, labelName];
  //     // Then, calculate the indices for the new label and add any related labels
  //     const newIndicesList = getIndicesByName([labelName]);
  //     const relatedLabels = getNamesByIndices(newIndicesList).filter(
  //       related => !newSelectedLabels.includes(related)
  //     );
  //     newSelectedLabels.push(...relatedLabels);
  //   }
  
  //   setSelectedLabels(newSelectedLabels);
  // };

  // const handleChapterSelection = (chapter: any) => {
  //   setSelectedChapter(chapter.no);
  // };

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

  const handleTogglePage = () => {
    const nextPage = currentPage === 'Exercise' ? 'Lesson' : 'Exercise';
    setCurrentPage(nextPage);
    onTogglePage(nextPage); // Use the callback instead of direct navigation
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
  
  if (loading) {
    return <View style={styles.centeredContainer}>
            <Image source={require('../../assets/mayologo.jpg')} style={styles.logo} />
        </View>;
  }

  // const answeredCount = goodCount + wrongCount;
  // const totalProgress = count > 0 ? (answeredCount / count) : 0;
  // const goodFlex = totalProgress > 0 ? (goodCount / answeredCount) : 0;
  // const wrongFlex = totalProgress > 0 ? (wrongCount / answeredCount) : 0;

  const answeredCount = 3;
  const totalProgress = 0.5;
  const goodFlex = 0.1;
  const wrongFlex = 0.2;

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        <View style={styles.placeholderBox}></View>

        <TouchableOpacity onPress={() => openModal(souratesModal)}>
          <SourateBox chapterNo={userState.selectedChapter}/>
        </TouchableOpacity>

        {/* Header Box for the counts
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>G{goodCount} W{wrongCount} T{count}</Text>
        </View> */}

        <View style={styles.progressBarContainer}>
          {/* <View style={[styles.progressAnswered, { flex: totalProgress }]}>
            <View style={[styles.progressGood, { flex: goodFlex }]} />
            <View style={[styles.progressWrong, { flex: wrongFlex }]} />
          </View>
          <View style={{ flex: 1 - totalProgress }} /> */}
           <ProgressBar totalProgress={totalProgress} goodProgress={goodCount} />
        </View>


        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={handleTogglePage}>
          <Text>{currentPage === 'Exercise' ? 'Lesson' : 'Exercise'}</Text>
        </TouchableOpacity>


        {/* TouchableOpacity for the settings button */}
        <TouchableOpacity onPress={() => openModal(settingsModal)}>
            {/* <Text style={styles.optionsMenuText}>...</Text> */}
            <FontAwesomeIcon icon={faCog} size={24} style={styles.settingsIcon} />
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
          selectedLabels={userState?.knownSourates}
          onLabelSelect={onLabelSelect}
          userState={userState}
          setUserState={setUserState}
        />
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
    padding: 10, // adjust padding as needed
    // other styles as needed
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
