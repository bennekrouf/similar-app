/* eslint-disable react-native/no-inline-styles */
import ScrollableTab from './ScrollableTab';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {I18nManager} from 'react-native';
import {loadChapters} from '../api/loadChapters';
import {loadSimilars} from '../api/loadSimilars';
interface ScrollableSwipablePageProps {}

const ScrollableSwipablePage: React.FC<ScrollableSwipablePageProps> = ({}) => {
  const handleChapterSelection = async (chapter: any) => {
    setSelectedChapter(chapter.no);
    // const newContents = await loadSimilars(chapter.no);
    // setContents(newContents);
  };

  const [chapters, setChapters] = useState<any[]>([]);
  const [contents, setContents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<number>(41);

  const parseChapterProp = (sourates: any, verses: any) => {
    return verses.map(verse => ({
      ...verse,
      backgroundColor: chapters.find(c => c.no === verse.chapter_no)
        ?.background_color,
    }));
  };

  useEffect(() => {
    I18nManager.forceRTL(true);
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
    <Swiper showsPagination={true} horizontal={true} loop={false}>
      {contents &&
        contents.map(
          (
            {kalima, verses, similars}: any,
            index: React.Key | null | undefined,
          ) => (
            <View key={index} style={{flex: 1}}>
              <ScrollableTab
                kalima={kalima}
                verses={verses}
                similars={similars}
                chapters={chapters}
                handleChapterSelection={handleChapterSelection}
              />
            </View>
          ),
        )}
    </Swiper>
  );
};

export default ScrollableSwipablePage;
