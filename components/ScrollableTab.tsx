import React, {useState} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VerseList from './VerseList';
import {ScrollableTabProps} from './interfaces';
import styles from './styles';
import CustomModal from './CustomModal'; // Import the TypeScript declaration file
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  PanResponderInstance,
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
          <VerseList verses={verses} key="verseList" similars={similars} />
        </View>

        {/* Pass the isModalOpen state and setIsModalOpen function as props */}
        <CustomModal
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
