/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import ScrollableTab from './ScrollableTab/ScrollableTab';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, UserContextType } from 'rn-auth-firebase';
import useFetchLessons from '../../hooks/useFetchLessons';
import { useUserPreference, UserPreferenceModal } from 'rn-user-preference-modal';
import { Logger } from 'rn-logging'; 

interface ScrollableSwipablePageProps {}

const LessonPages: React.FC<ScrollableSwipablePageProps> = ({ }) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    isUserPreferenceOpen,
    handleOpenUserPreference,
    handleCloseUserPreference,
  } = useUserPreference();

  const handleChapterSelection = (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

  useEffect(() => {
    const getSelectedChapterFromStorage = async () => {
      try {
        Logger.info('Fetching selected chapter from storage', { tag: 'LessonPages' });
        const storedSelectedChapter = await AsyncStorage.getItem('selectedChapter');
        if (storedSelectedChapter) {
          setSelectedChapter(parseInt(storedSelectedChapter));
        }
      } catch (error) {
        Logger.error('Error retrieving selectedChapter from AsyncStorage', error, { tag: 'LessonPages' });
      }
    };

    if (user) {
      getSelectedChapterFromStorage();
    }
  }, []);

  const handleSwiperIndexChanged = async (index: number) => {
    try {
      if (!selectedChapter) return;
      await AsyncStorage.setItem('selectedChapter', selectedChapter.toString());
      await AsyncStorage.setItem('currentIndex', index.toString());
    } catch (error) {
      Logger.error('Error storing data in AsyncStorage', error, { tag: 'LessonPages' });
    }
  };

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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        index={currentIndex}
      >
        {contents?.length &&
          contents?.map(({ kalima, verses, similars, opposites }: any, index) => (
            <View key={index} style={{ flex: 1 }}>
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
      {/* <UserPreferenceModal
        visible={isUserPreferenceOpen}
        onClose={handleCloseUserPreference}
      /> */}
    </View>
  );
};

export default LessonPages;
