import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import SourateBox from '../../SourateBox';
import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';

import LessonContent from './LessonContent';
import {ScrollableTabProps} from '../../../models/interfaces';
import {loadExercise} from '../../../api/loadExercisesList';
import { flushAllLessonKeys } from '../../../api/flushAllLessonKeys';
import { useChapters } from '../../../hooks/useFetchChapters';
import { RootStackParamList } from '../../../models/interfaces';
import SouratesSelector from '../../../modals/SourateSelector/SouratesSelector';

const ScrollableTab: React.FC<ScrollableTabProps> = ({kalima, verses, similars, opposites, handleChapterSelection}) => {
  // console.log(`'Rendering ScrollableTab' with ${kalima} ${JSON.stringify(verses)} ${JSON.stringify(similars)} ${JSON.stringify(opposites)}`);
  // console.log(`'Rendering ScrollableTab' with ${JSON.stringify(verses[0])}`);
  const {t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleOpenMayoSettings, isMayoSettingsOpen, handleCloseMayoSettings } = useMayoSettings();
  const {chapters, isLoading} = useChapters();

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'DiscriminantExercise'>>();

  const handleOpenSouratesModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseSouratesModal = () => {
    setIsModalOpen(false);
  };

  const handleLabelPress = async (chapter: {no: number | undefined}) => {
    handleCloseSouratesModal();
    if (chapter.no) {
      handleChapterSelection({no: chapter.no});

      try {
        await AsyncStorage.setItem('selectedChapter', chapter.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };

    // (async () => {
    //   setExercises(await loadExercise(kalima).catch(console.error));
    // })();

  return (
    <>
      <View style={styles.view}>
        {/* Left section of the header */}
        {/* <View style={styles.headerContainer}>

          <View>
            <Text style={styles.leftHeaderText}>
              {kalima} ({verses.length + similars.length + opposites.length})
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleOpenSouratesModal}>
            <SourateBox chapterNo={verses[0]?.chapter_no} />
          </TouchableOpacity>

        </View> */}

        <View>
          <LessonContent
            verses={verses}
            key="verseList"
            similars={similars}
            opposites={opposites}
          />
        </View>

        <MayoSettingsModal
          visible={isMayoSettingsOpen}
          onClose={handleCloseMayoSettings}
          config={{
            headerTitle: 'Select sourate',
          }}
        >
          <SouratesSelector handleLabelPress={handleLabelPress} chapters={chapters} />
        </MayoSettingsModal>
      </View>
    </>
  );
};

export default React.memo(ScrollableTab);

const styles = StyleSheet.create({
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
    marginBottom: 5,
    paddingHorizontal: 5,
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
    fontFamily: 'ScheherazadeNew-Regular',
    color: '#040101',
  },
  rightHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Regular',
    color: 'white',
  }
});
