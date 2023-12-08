/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';

import ScrollableTab from './ScrollableTab/ScrollableTab';
import useFetchLessons from '../../hooks/useFetchLessons';
import { I18nManager } from 'react-native';

const HEADER_HEIGHT = 0;
interface ScrollableSwipablePageProps {
  selectedChapter: number;
}

const LessonPages: React.FC<ScrollableSwipablePageProps> = ({ selectedChapter }) => {
  I18nManager.forceRTL(true);
  const { user } = useContext(UserContext) as UserContextType;
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  
  const handleSwiperIndexChanged = async (index: number) => {
    try {
      if (!selectedChapter) return;
      await AsyncStorage.setItem('selectedChapter', selectedChapter.toString());
      await AsyncStorage.setItem('currentIndex', index.toString());
    } catch (error) {
      Logger.error('Error storing data in AsyncStorage', error, { tag: 'LessonPages' });
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tabs.Container onIndexChange={handleSwiperIndexChanged} tabBarHeight={0}>
      {contents?.length &&
        contents.map((content: any, index) => (
          <Tabs.Tab name={`Tab${index}`} key={index}>
            <Tabs.ScrollView>
              <ScrollableTab content={content}/>
            </Tabs.ScrollView>
          </Tabs.Tab>
        ))}
    </Tabs.Container>
  );
};

export default LessonPages;