import React, {useContext, useEffect, useState, useCallback} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import SourateBox from '../SourateBox';

import { UserContext, authEvents } from 'rn-auth-firebase';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../../models/interfaces';
import ChapterSelectionModal from '../ChapterSelectionModal'; // Import the TypeScript declaration file
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadExercise} from '../../../api/loadExercisesList'; // import your API function

type RootStackParamList = {
  LessonPages: undefined; // If this route does not take any parameters
  SignIn: undefined,
  DiscriminantExercise: {
    kalima: string;
    currentChapterName: string;
    exercises: any;
  };
};

const ScrollableTab: React.FC<ScrollableTabProps> = ({
  kalima,
  verses,
  similars,
  opposites,
  handleChapterSelection,
}) => {
  const {t} = useTranslation();
  let { user, logout } = useContext(UserContext);
  // user = useContext(UserContext).user;
  // console.log('After', user);

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
    if (chapter.no !== undefined) {
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

  const handlePress = () => {
    user ? goExercises() : navigation.navigate('SignIn');
  };

  // useEffect(() => {
  //   // console.log('useEffect running'); // Debug line

  // if (!user) {
  //   // console.log('Attaching listener'); // Debug line
  //   const handleSignIn = (newUser) => {
  //     console.log('user logged : ', newUser);
  //     goExercises();
  //   };

  //   // console.log(`Current listener count before add: ${authEvents.listenerCount('signedIn')}`); // Debug line
  //   authEvents.on('signedIn', handleSignIn);
  //   // console.log(`Current listener count after add: ${authEvents.listenerCount('signedIn')}`); // Debug line

  //   return () => {
  //     // console.log('Removing listener'); // Debug line
  //     authEvents.off('signedIn', handleSignIn);
  //     // console.log(`Current listener count after remove: ${authEvents.listenerCount('signedIn')}`); // Debug line
  //   };
  // }
  // }, [kalima]);

  const loadData = useCallback(async () => {
    try {
      const exos = await loadExercise(kalima);
      console.log(`NUMBER OF EXERCISES for ${kalima}: ${exos?.length}`);
      setExercises(exos);
    } catch (error) {
      console.error(error);
    }
  }, [kalima]);

  const handleLogout = () => {
    if (logout) { // Make sure logout is defined
      logout();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: 'red', marginRight: 10 }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, logout]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  // console.log('verses : ', verses[0]);
  return (
    <ScrollableTabView>
      <View style={styles.view}>
        {/* Left section of the header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.leftHeaderText}>
              {kalima} ({verses.length + similars.length + opposites.length})
            </Text>
          </View>

          <TouchableOpacity style={styles.navigationButton} onPress={handlePress}>
            <Text style={styles.navigationText}>{t('test')}({exercises.length})</Text>
          </TouchableOpacity>

            <TouchableOpacity
              onPress={handleOpenModal}>
              <SourateBox chapterNo={verses[0]?.chapter_no} />
            </TouchableOpacity>

        </View>

        <View style={styles.verseList}>
          <LessonContent
            verses={verses}
            key="verseList"
            similars={similars}
            opposites={opposites}
          />
        </View>

        <ChapterSelectionModal
          visible={isModalOpen}
          onClose={handleCloseModal}
          handleLabelPress={handleLabelPress}
          panResponder={panResponder}
        />
      </View>
    </ScrollableTabView>
  );
};

export default React.memo(ScrollableTab);

const styles = StyleSheet.create({
  navigationButton: {
    //...add your styles here
  },
  navigationText: {
    //...add your styles here
  },
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
    // Add additional styles as needed
  },
  sourateHeaderView: {
    // backgroundColor: 'green',
    // color: 'white',
    // borderRadius: 15,
    // paddingHorizontal: 10,
  },
  rightHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Regular',
    color: 'white',
  },
  verseList: {
    // paddingTop: 40,
  },
});
