import React, {useState} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {useNavigation} from '@react-navigation/native';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../models/interfaces';
import ChapterSelectionModal from './ChapterSelectionModal'; // Import the TypeScript declaration file
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScrollableTab: React.FC<ScrollableTabProps> = ({
  kalima,
  verses,
  similars,
  chapters,
  opposites,
  handleChapterSelection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

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
        {/* Left section of the header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.leftHeaderText}>
              {kalima} ({verses.length + similars.length})
            </Text>
          </View>

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() =>
              navigation.navigate('DiscriminantExercise', {kalima})
            }>
            <Text style={styles.navigationText}>Test</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sourateHeaderView}
            onPress={handleOpenModal}>
            <View>
              <Text style={styles.rightHeaderText}>{verses[0].sourate}</Text>
            </View>
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
    marginBottom: 0,
    paddingHorizontal: 3,
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
    fontFamily: 'ScheherazadeNew-Medium',
    color: '#040101',
    // Add additional styles as needed
  },
  sourateHeaderView: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  rightHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Regular',
    // fontWeight: 'bold',
    // color: '#040101',
    color: 'white',
  },
  verseList: {
    // paddingTop: 40,
  },
});
