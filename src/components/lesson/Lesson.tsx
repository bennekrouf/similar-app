import { Tabs } from 'react-native-collapsible-tab-view';
import React from 'react';

import { Logger } from 'mayo-logger';

import ScrollableTab from './ScrollableTab/ScrollableTab';
import { I18nManager } from 'react-native';
import { useFetchUser } from '../../hooks/useFetchUser';
import { initialState } from '../../models/UserState';
import useCurrentScreen from '../../hooks/useCurrentScreen';
import { LessonListProps } from '../../models/LessonListProps';

const HEADER_HEIGHT = 0;
interface ScrollableSwipablePageProps {
  selectedChapter: number;
  lesson: LessonListProps[];
  isLoading: boolean;
  error: any;
}

const Lesson: React.FC<ScrollableSwipablePageProps> = ({ selectedChapter, lesson, isLoading, error }) => {
  // I18nManager.forceRTL(true);
  useCurrentScreen('Lesson');
  const [userState, setUserState] = useFetchUser(initialState);
  
  const handleSwiperIndexChanged = async (index: number) => {
    try {
      if (!selectedChapter) return;
      setUserState({...userState, selectedChapter, currentIndex: index});
    } catch (error) {
      Logger.error('Error storing data in AsyncStorage', error, { tag: 'Lesson' });
    }
  };

  // if (isLoading) {
  //   return (
  //     <View style={styles.centeredContainer}>
  //       <Image source={require('../../../assets/mayologo.jpg')} style={styles.logo} />
  //     </View>
  //   );
  // }

  const sortLessonsByVerseNo = (lessons: LessonListProps[]) => {
    return lessons
      ?.slice() // Create a copy of the lesson array
      .sort((a, b) => {
        // Sort based on the first verse_no
        const verseA = a.verses[0];
        const verseB = b.verses[0];
        return verseA.verse_no - verseB.verse_no;
      });
  };

  const sortedLessons = sortLessonsByVerseNo(lesson);

  return (
    <Tabs.Container onIndexChange={handleSwiperIndexChanged} tabBarHeight={0}>
      {sortedLessons?.length &&
        sortedLessons.map((content: LessonListProps, index:number) => (
          <Tabs.Tab name={`Tab${index}`} key={index}>
            <Tabs.ScrollView>
              <ScrollableTab content={content} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        ))}
    </Tabs.Container>
  );
};

export default Lesson;