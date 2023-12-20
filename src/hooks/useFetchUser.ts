import { useState, useEffect, useContext } from 'react';

import { writeToAsyncStorage, loadFromAsyncStorage, syncAsyncStorageToFirestore } from 'mayo-firestore-write';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';

import { getBestIndex } from '../components/getBestIndex';
import { UserState } from '../models/UserState';

export const useFetchUser = <T extends UserState>(initialState: T): [T, (data: T) => Promise<void>, boolean] => {
  debugger
  const [userSettings, setUserSettings] = useState<T>(null);
  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedState: T | null = await loadFromAsyncStorage();
        console.log(`Saved usersettings : ${JSON.stringify(savedState)}`);

        if (savedState?.knownSourates?.length) {
          Logger.info('Fetching currentIndex from storage', { tag: 'LessonPages' });
          savedState.currentIndex = await getBestIndex(savedState.knownSourates, 'currentIndex');
          savedState.selectedChapter = await getBestIndex(savedState.knownSourates, 'selectedChapter');
          await updateUserSettings({...savedState});
        } else {
          await updateUserSettings({...initialState, ok: true});
        }
      } catch (error) {
        console.error('Failed to fetch the data from storage', error);
        setUserSettings(initialState);
      } finally {
        setLoading(false);
      }
    };
    if(!user) return;
    loadData();
  }, [user]);

  const updateUserSettings = async (data: T) => {
    if (JSON.stringify(data) === JSON.stringify(userSettings)) {
      // Data is the same as current usersettings, no need to update
      return;
    }

    try {
      if (data?.knownSourates?.length) {
        data.currentIndex = await getBestIndex(data.knownSourates, 'currentIndex');
        data.selectedChapter = await getBestIndex(data.knownSourates, 'selectedChapter');
      }
      writeToAsyncStorage(data, false);
      // syncAsyncStorageToFirestore();
      setUserSettings(data);
    } catch (error) {
      console.error('Failed to save the data to storage', error);
    }
  };

  return [userSettings, updateUserSettings, isLoading];
};
