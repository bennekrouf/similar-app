/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import ScrollableTab from './ScrollableTab';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {loadChapters} from '../api/loadChapters';
import {loadSimilars} from '../api/loadSimilars';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ScrollableSwipablePageProps {}

const SwipablePage: React.FC<ScrollableSwipablePageProps> = ({}) => {
  const handleChapterSelection = async (chapter: any) => {
    setSelectedChapter(chapter.no);
  };

  const [chapters, setChapters] = useState<any[]>([]);
  const [contents, setContents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Use the useState hook to set selectedChapter state
  const [selectedChapter, setSelectedChapter] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    // When the component mounts, retrieve the selectedChapter value from AsyncStorage
    const getSelectedChapterFromStorage = async () => {
      try {
        const storedSelectedChapter = await AsyncStorage.getItem(
          'selectedChapter',
        );
        if (storedSelectedChapter) {
          setSelectedChapter(parseInt(storedSelectedChapter));
        }
      } catch (error) {
        console.log(
          'Error retrieving selectedChapter from AsyncStorage:',
          error,
        );
      }
    };

    getSelectedChapterFromStorage();
  }, []); // Empty dependency array to run this effect only once, on mount

  const parseChapterProp = (sourates: any, verses: any) => {
    return verses.map(verse => ({
      ...verse,
      backgroundColor: chapters.find(c => c.no === verse.chapter_no)
        ?.backgroundColor,
    }));
  };

  const handleSwiperIndexChanged = async (index: number) => {
    try {
      if (!selectedChapter) {
        return;
      }

      // Store selectedChapter and index in AsyncStorage
      await AsyncStorage.setItem('selectedChapter', selectedChapter.toString());
      await AsyncStorage.setItem('currentIndex', index.toString());
      console.log(
        'Saved indexes : ',
        selectedChapter.toString(),
        index.toString(),
      );
    } catch (error) {
      console.log('Error storing data in AsyncStorage:', error);
    }
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0); // Use the useState hook to set currentIndex state

  useEffect(() => {
    // When the component mounts, retrieve the currentIndex value from AsyncStorage
    const getCurrentIndexFromStorage = async () => {
      try {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [similarsData, chaptersData] = await Promise.all([
          loadSimilars(selectedChapter),
          loadChapters(),
        ]);
        setContents(() => {
          return similarsData.map(similar => {
            return {
              ...similar,
              verses: parseChapterProp(chapters, similar.verses),
              opposites: parseChapterProp(chapters, similar.opposites),
              similars: parseChapterProp(chapters, similar.similars),
            };
          });
        });
        setChapters(chaptersData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedChapter]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Swiper
      showsPagination={true}
      horizontal={true}
      loop={false}
      onIndexChanged={handleSwiperIndexChanged} // Add the onIndexChanged event
      index={currentIndex} // Set the initial index of the Swiper to currentIndex
    >
      {contents &&
        contents.map(
          (
            {kalima, verses, similars, opposites}: any,
            index: React.Key | null | undefined,
          ) => (
            <View key={index} style={{flex: 1}}>
              <ScrollableTab
                kalima={kalima}
                verses={verses}
                similars={similars}
                opposites={opposites}
                chapters={chapters}
                handleChapterSelection={handleChapterSelection}
              />
            </View>
          ),
        )}
    </Swiper>
  );
};

export default SwipablePage;
