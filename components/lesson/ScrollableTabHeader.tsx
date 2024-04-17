import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import ChapterSelectionModal from './ChapterSelectionModal'; // Import the TypeScript declaration file

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponderInstance,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ScrollableTabHeaderProps {
  kalima: string;
  verses: any[];
  chapters: any[];
  handleChapterSelection: any;
}

type RootStackParamList = {
    SwipablePage: undefined; // If this route does not take any parameters
    DiscriminantExercise: {kalima: string; currentChapterName: string};
  };

const ScrollableTabHeader: React.FC<ScrollableTabHeaderProps> = ({
  kalima,
  verses,
  chapters,
  handleChapterSelection,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenModal = () => {
    console.log("gjdfkjghdfjkgjkhjkdfg !!!!!");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.leftHeaderText}>
          {kalima} ({verses.length})
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DiscriminantExercise', {
            kalima,
            currentChapterName: verses[0].sourate,
          })
        }>
        <Text>{t('test')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sourateHeaderView}
        onPress={handleOpenModal}>
        <View>
          <Text style={styles.rightHeaderText}>{verses[0].sourate}</Text>
        </View>
      </TouchableOpacity>

      <ChapterSelectionModal
          visible={isModalOpen}
          onClose={handleCloseModal} // Close the modal
          chapters={chapters}
          handleLabelPress={handleLabelPress}
          panResponder={panResponder}
        />

    </View>
  );
};

export default ScrollableTabHeader;

const styles = StyleSheet.create({
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
  });
  