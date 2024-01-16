import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'mayo-logger';

export const useCurrentIndexFromStorage = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentIndexFromStorage = async () => {
      try {
        Logger.info('Fetching currentIndex from storage', { tag: 'useCurrentIndexFromStorage' });
        const storedCurrentIndex = await AsyncStorage.getItem('currentIndex');
        if (storedCurrentIndex !== null) {
          setCurrentIndex(parseInt(storedCurrentIndex));
        }
      } catch (error) {
        Logger.error('Error retrieving currentIndex from AsyncStorage', error, { tag: 'useCurrentIndexFromStorage' });
      }
    };

    getCurrentIndexFromStorage();
  }, []);

  return currentIndex;
};
