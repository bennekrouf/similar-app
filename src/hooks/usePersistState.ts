import { useState, useEffect } from 'react';
import { writeToAsyncStorage, loadFromAsyncStorage } from 'rn-write-firestore';

const storageKey = 'knownSourates';

export const usePersistedState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedState = await loadFromAsyncStorage();
        console.log(`Saved state : ${JSON.stringify(savedState)}`);
  
        // Here, we'll use savedState?.data if it exists, otherwise fall back to initialState
        setState((savedState && savedState[storageKey]) ?? initialState);
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
      await writeToAsyncStorage({data : { [storageKey]: data }}, false);
      setState(prevState => {
        // Avoid unnecessary re-renders
        if (JSON.stringify(prevState) !== JSON.stringify(data)) {
          return data;
        }
        return prevState;
      });
    } catch (error) {
      console.error('Failed to save the data to storage', error);
    }
  };

  return [state, setPersistedState, isLoading];
};
