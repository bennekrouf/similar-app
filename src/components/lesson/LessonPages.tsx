/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';

import ScrollableTab from './ScrollableTab/ScrollableTab';
import useFetchLessons from '../../hooks/useFetchLessons';

const HEADER_HEIGHT = 0;
interface ScrollableSwipablePageProps {}

const LessonPages: React.FC<ScrollableSwipablePageProps> = ({ }) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [selectedChapter, setSelectedChapter] = useState<number | 2>(2);
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChapterSelection = (chapter: any) => {
    setSelectedChapter(chapter.no);
  };



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
    <Tabs.Container>
      {contents?.length &&
        contents.map(({ kalima, verses, similars, opposites }: any, index) => (
          <Tabs.Tab name={`Tab${index}`} key={index}>
            <Tabs.ScrollView>
              <ScrollableTab
                kalima={kalima}
                verses={verses}
                similars={similars}
                opposites={opposites}
                handleChapterSelection={handleChapterSelection}
              />
            </Tabs.ScrollView>
          </Tabs.Tab>
        ))}
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
});

export default LessonPages;