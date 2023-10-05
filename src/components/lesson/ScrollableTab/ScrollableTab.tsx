import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, PanResponder, PanResponderInstance, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import { useLogout, UserContext, UserContextType } from 'rn-auth-firebase';

import SourateBox from '../../SourateBox';
import OptionsMenuModal from '../../../modals/SourateConfiguration/OptionsMenuModal';
import LessonContent from './LessonContent';
import NewChapterSelectionModal from '../../../modals/SourateSelector/NewChapterSelectionModal';
import {ScrollableTabProps} from '../../../models/interfaces';
import {loadExercise} from '../../../api/loadExercisesList';
import { flushAllLessonKeys } from '../../../api/flushAllLessonKeys';

type RootStackParamList = {
  LessonPages: undefined;
  SignIn: undefined,
  DiscriminantExercise: {
    kalima: string;
    currentChapterName: string;
    exercises: any;
  };
};

const ScrollableTab: React.FC<ScrollableTabProps> = ({kalima, verses, similars, opposites, handleChapterSelection}) => {
  const {t} = useTranslation();
  const { authEvents } = useContext(UserContext) as UserContextType;
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const { performLogout } = useLogout();

  const handleOpenOptionsMenu = () => {
    setIsOptionsMenuOpen(true);
  };
  
  const handleCloseOptionsMenu = () => {
    setIsOptionsMenuOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'DiscriminantExercise'>>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePanResponderRelease = (evt: any, gestureState: {dy: number}) => {
    // Check if the user has swiped down by a certain threshold
    if (gestureState.dy > 100) {
      handleCloseModal();
    }
  };

  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: handlePanResponderRelease,
  });

  const handleLabelPress = async (chapter: {no: number | undefined}) => {
    handleCloseModal();
    if (chapter.no) {
      handleChapterSelection({no: chapter.no});

      try {
        await AsyncStorage.setItem('selectedChapter', chapter.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };

  const goExercises = () => {
    navigation.navigate('DiscriminantExercise', {
      kalima,
      currentChapterName: verses[0]?.sourate,
      exercises,
    });
  }

  const handleLogout = () => {
    if (performLogout) {
      performLogout();
      handleCloseOptionsMenu();
    }
  };

  useEffect(() => {
    const onSignedOut = async () => {
      await flushAllLessonKeys();
      navigation.navigate('SignIn');
    };
    
    authEvents.on('signedOut', onSignedOut);
    return () => authEvents.off('signedOut', onSignedOut);
  }, []);

  useEffect(() => {
    (async () => {
      setExercises(await loadExercise(kalima).catch(console.error));
    })();
  }, [kalima]);

  return (
    <>
    <ScrollableTabView>
      <View style={styles.view}>
        {/* Left section of the header */}
        <View style={styles.headerContainer}>

        <TouchableOpacity onPress={handleOpenOptionsMenu}>
          <Text style={styles.optionsMenuText}>...</Text>
        </TouchableOpacity>

          <View>
            <Text style={styles.leftHeaderText}>
              {kalima} ({verses.length + similars.length + opposites.length})
            </Text>
          </View>

          <TouchableOpacity onPress={goExercises}>
            <Text>{t('test')}({exercises.length})</Text>
          </TouchableOpacity>

            <TouchableOpacity
              onPress={handleOpenModal}>
              <SourateBox chapterNo={verses[0]?.chapter_no} />
            </TouchableOpacity>

        </View>

        <View>
          <LessonContent
            verses={verses}
            key="verseList"
            similars={similars}
            opposites={opposites}
          />
        </View>

        <NewChapterSelectionModal
          visible={isModalOpen}
          onClose={handleCloseModal}
          handleLabelPress={handleLabelPress}
          panResponder={panResponder}
        />
      </View>
      </ScrollableTabView>

      <OptionsMenuModal 
        visible={isOptionsMenuOpen} 
        onClose={handleCloseOptionsMenu} 
        onLogout={handleLogout}
        />
        </>
  );
};

export default React.memo(ScrollableTab);

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  },
  centerHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Medium',
    color: '#040101',
    // Add additional styles as needed
  },

  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5,
    elevation: 3, // This will add shadow in Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      // iOS shadow
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22, // iOS shadow
    shadowRadius: 2.22, // iOS shadow
    backgroundColor: '#fff', // You should set background color for the shadow to appear
  },
  leftHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Regular',
    color: '#040101',
  },
  rightHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Regular',
    color: 'white',
  },
  optionsMenuText: {
    fontSize: 24,
    padding: 5,
    // Add more styles if needed
  }
});
