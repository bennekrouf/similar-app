/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import ScrollableSwipablePage from './components/ScrollableSwipablePage';
import {View, Text, TouchableOpacity, Modal, PanResponder} from 'react-native';
import {I18nManager} from 'react-native';
import {loadChapters} from './api/loadChapters';
import {loadSimilars} from './api/loadSimilars';

const App: React.FC = () => {
  const [chapters, setChapters] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLabelPress = async (chapter: {no: number | undefined}) => {
    closeModal();
    const updatedSimilars = await loadSimilars(chapter.no);

    // Set the sorted verses as the new value for similars
    setContents(updatedSimilars);
  };

  const handlePanResponderRelease = (evt: any, gestureState: {dy: number}) => {
    // Check if the user has swiped down by a certain threshold
    if (gestureState.dy > 100) {
      closeModal();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: handlePanResponderRelease,
  });

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
          loadSimilars(),
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
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {/* Main App Content */}
      <ScrollableSwipablePage contents={contents} />

      {/* Floating Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: '#ff8c00',
          borderRadius: 25,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
        }}
        onPress={openModal}>
        <Text style={{color: 'white', fontSize: 24}}>...</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isModalOpen} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', minHeight: '80%'}}
            {...panResponder.panHandlers}>
            {/* Modal Content */}
            <View style={{padding: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
              {chapters.map(
                (
                  chapter: {name: any; count: any},
                  index: React.Key | null | undefined,
                ) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: 'lightgrey',
                      borderRadius: 20,
                      padding: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => handleLabelPress(chapter)}>
                    <Text>{`${chapter.name} (${chapter.count})`}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            {/* Close Button */}
            <TouchableOpacity style={{marginTop: 20}} onPress={closeModal}>
              <Text style={{color: 'black', fontSize: 14}}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
