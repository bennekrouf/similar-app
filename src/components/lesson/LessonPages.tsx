/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import React, { useContext } from 'react';

import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';

import ScrollableTab from './ScrollableTab/ScrollableTab';
import useFetchLessons from '../../hooks/useFetchLessons';
import { I18nManager } from 'react-native';
import { useFetchUser } from '../../hooks/useFetchUser';
import { initialState } from '../../models/UserState';

const HEADER_HEIGHT = 0;
interface ScrollableSwipablePageProps {
  selectedChapter: number;
}

const LessonPages: React.FC<ScrollableSwipablePageProps> = ({ selectedChapter }) => {
  I18nManager.forceRTL(true);
  const [userState, setUserState] = useFetchUser(initialState);
  const { user } = useContext(UserContext) as UserContextType;
  const { contents, isLoading } = useFetchLessons(selectedChapter);
  
  const handleSwiperIndexChanged = async (index: number) => {
    try {
      if (!selectedChapter) return;
      setUserState({...userState, selectedChapter, currentIndex: index});
    } catch (error) {
      Logger.error('Error storing data in AsyncStorage', error, { tag: 'LessonPages' });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <Image source={require('../../../assets/mayologo.jpg')} style={styles.logo} />
      </View>
    );
  }

  return (
    <Tabs.Container onIndexChange={handleSwiperIndexChanged} tabBarHeight={0}>
      {contents?.length &&
        contents.map((content: any, index) => (
          <Tabs.Tab name={`Tab${index}`} key={index}>
            <Tabs.ScrollView>
              <ScrollableTab content={content} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        ))}
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
});

export default LessonPages;