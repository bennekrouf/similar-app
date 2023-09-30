import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { writeToAsyncStorage, writeToFirebase } from 'rn-write-firestone';

const storageKey = 'known-sourates';
export const usePersistedState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(storageKey);
        const savedState = savedStateString ? JSON.parse(savedStateString)[storageKey] : null;
        if (savedState !== null) {
          setState(savedState);
        } else {
            setState(initialState);
          }
      } catch (error) {
        console.error('Failed to fetch the data from storage', error);
        setState(initialState);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storageKey, initialState]);

  const setPersistedState = async (data: T) => {
    if (data === undefined) {
        console.warn(`Attempting to save undefined value to storage. Ignored. With the key ${JSON.stringify(storageKey)}`);
        return;
      }
    try {
    //   await writeToAsyncStorage({ [storageKey]: data }, false);
      await writeToFirebase({ [storageKey]: data }, false);
      setState(data);
    } catch (error) {
      console.error('Failed to save the data to storage', error);
    }
  };

  return [state, setPersistedState, isLoading];
};
