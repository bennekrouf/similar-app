import React, {useState} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../models/interfaces';
import ChapterSelectionModal from './ChapterSelectionModal'; // Import the TypeScript declaration file
import {
  View,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollableTabHeader from './ScrollableTabHeader'; // Import the new header component

type RootStackParamList = {
  SwipablePage: undefined; // If this route does not take any parameters
  DiscriminantExercise: {kalima: string; currentChapterName: string};
};

const ScrollableTab: React.FC<ScrollableTabProps> = ({
  kalima,
  verses,
  similars,
  chapters,
  opposites,
  handleChapterSelection,
}) => {
  const {t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        // Save the selectedChapter in AsyncStorage
        await AsyncStorage.setItem('selectedChapter', chapter.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };

  return (
    <ScrollableTabView>
      <View style={styles.view}>
        <ScrollableTabHeader kalima={kalima} verses={verses} />
        <View>
          <LessonContent
            verses={verses}
            key="verseList"
            similars={similars}
            opposites={opposites}
          />
        </View>

        {/* Pass the isModalOpen state and setIsModalOpen function as props */}
        <ChapterSelectionModal
          visible={isModalOpen}
          onClose={handleCloseModal} // Close the modal
          chapters={chapters}
          handleLabelPress={handleLabelPress}
          panResponder={panResponder}
        />
      </View>
    </ScrollableTabView>
  );
};

export default ScrollableTab;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  },
});
