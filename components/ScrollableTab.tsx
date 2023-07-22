import React, {useState} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../models/interfaces';
import ChapterSelectionModal from './ChapterSelectionModal'; // Import the TypeScript declaration file
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
} from 'react-native';

const ScrollableTab: React.FC<ScrollableTabProps> = ({
  kalima,
  verses,
  similars,
  chapters,
  handleChapterSelection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    handleChapterSelection({no: chapter.no});
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
            style={styles.sourateHeaderView}
            onPress={handleOpenModal}>
            <View>
              <Text style={styles.rightHeaderText}>{verses[0].sourate}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.verseList}>
          <LessonContent verses={verses} key="verseList" similars={similars} />
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
  view: {flex: 1, padding: 0},
  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingHorizontal: 3,
    // backgroundColor: '#3a3939',
    // color: '#f0eded',
    borderBottomWidth: 0.5,
    borderTopColor: 'white',
  },
  leftHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Medium',
    color: '#040101',
    // Add additional styles as needed
  },
  sourateHeaderView: {
    backgroundColor: 'red',
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
    paddingTop: 40,
  },
});
