/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import ScrollableTab from './ScrollableTab/ScrollableTab';
import React, {useEffect, useState, useContext} from 'react';
import {View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, UserContextType } from 'rn-auth-firebase';
import useFetchLessons from '../../hooks/useFetchLessons';
// import UserPreferenceModal from '../../modals/SourateConfiguration/UserPreferenceModal';
import { useUserPreference, UserPreferenceModal } from 'rn-user-preference-modal';

interface ScrollableSwipablePageProps {}

const LessonPages: React.FC<ScrollableSwipablePageProps> = ({}) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    isUserPreferenceOpen,
    handleOpenUserPreference,
    handleCloseUserPreference,
  } = useUserPreference();

  const handleChapterSelection = async (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

  useEffect(() => {
    // When the component mounts, retrieve the selectedChapter value from AsyncStorage
    const getSelectedChapterFromStorage = async () => {
      try {
        console.log('In selected chapter')
        const storedSelectedChapter = await AsyncStorage.getItem('selectedChapter',);
        if (storedSelectedChapter) {
          setSelectedChapter(parseInt(storedSelectedChapter));
        }
      } catch (error) {
        console.log('Error retrieving selectedChapter from AsyncStorage:', error);
      }
    };
    if(user) {
      getSelectedChapterFromStorage();
    }
  }, []);

  const handleSwiperIndexChanged = async (index: number) => {
    try {
      if (!selectedChapter) {
        return;
      }

      // Store selectedChapter and index in AsyncStorage
      await AsyncStorage.setItem('selectedChapter', selectedChapter.toString());
      await AsyncStorage.setItem('currentIndex', index.toString());
      // console.log('Saved indexes : ', selectedChapter.toString(), index.toString());
    } catch (error) {
      console.log('Error storing data in AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // When the component mounts, retrieve the currentIndex value from AsyncStorage
    const getCurrentIndexFromStorage = async () => {
      try {
        console.log('getCurrentIndexFromStorage');
        const storedCurrentIndex = await AsyncStorage.getItem('currentIndex');
        if (storedCurrentIndex) {
          setCurrentIndex(parseInt(storedCurrentIndex));
        }
      } catch (error) {
        console.log('Error retrieving currentIndex from AsyncStorage:', error);
      }
    };

    getCurrentIndexFromStorage();
  }, []); // Empty dependency array to run this effect only once, on mount

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Swiper
        showsPagination={true}
        horizontal={true}
        loop={false}
        onIndexChanged={handleSwiperIndexChanged}
        index={currentIndex} // Set the initial index of the Swiper to currentIndex
      >
        {contents?.length &&
          contents?.map(({kalima, verses, similars, opposites}: any, index) => (
            <View key={index} style={{flex: 1}}>
              <ScrollableTab
                kalima={kalima}
                verses={verses}
                similars={similars}
                opposites={opposites}
                handleChapterSelection={handleChapterSelection}
              />
            </View>
          ))}
      </Swiper>
      <UserPreferenceModal
        visible={isUserPreferenceOpen}
        onClose={handleCloseUserPreference}
      />
    </View>
  );
};

export default LessonPages;
