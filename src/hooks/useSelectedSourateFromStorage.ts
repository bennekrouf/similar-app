import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'mayo-logger';

export const useSelectedChapterFromStorage = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  useEffect(() => {
    const getSelectedChapterFromStorage = async () => {
      try {
        Logger.info('Fetching selected sourate from storage', { tag: 'useSelectedChapterFromStorage' });
        const storedSelectedChapter = await AsyncStorage.getItem('selectedChapter');
        if (storedSelectedChapter !== null) {
          setSelectedChapter(parseInt(storedSelectedChapter));
        }
      } catch (error) {
        Logger.error('Error retrieving selectedChapter from AsyncStorage', error, { tag: 'useSelectedChapterFromStorage' });
      }
    };

    getSelectedChapterFromStorage();
  }, []);

  return selectedChapter;
};
