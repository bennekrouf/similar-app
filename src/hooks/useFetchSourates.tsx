import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { useFetchUser } from './useFetchUser';
import { loadChapters } from '../api/loadSourates';
import { Sourate } from '../models/Sourate';
import { initialState } from '../models/UserState';

interface SourateContextProps {
  sourates: Sourate[];
  isSourateLoading: boolean;
  triggerChapterFetch: () => void;
}

const ChapterContext = createContext<SourateContextProps | null>(null);
interface SourateProviderProps {
  children: ReactNode;
}

// Create a provider component
export const SourateProvider: React.FC<SourateProviderProps> = ({ children }) => {
  const [sourates, setChapters] = useState<Sourate[]>([]);
  const [isSourateLoading, setIsChapterLoading] = useState(false);
  const [userState, setPersistedState, loading] = useFetchUser(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext) as UserContextType;
  const [triggerFetch, setTriggerFetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsChapterLoading(true);
        
        const chaptersData = await loadChapters(userState?.ranges);
        setChapters(chaptersData);
        Logger.info('Sourates data successfully fetched and set.', null, { tag: 'ChapterContext' });
      } catch (error) {
        const errorMessage = 'Error occurred while fetching sourates data.';
        Logger.error(errorMessage, error, { tag: 'ChapterContext' });
      } finally {
        setIsChapterLoading(false);
      }
    };
    if(user && userState) fetchData();
  }, [user, userState, triggerFetch]);

  const triggerChapterFetch = () => {
    setTriggerFetch(prev => prev + 1); // Function to trigger re-fetch
  };

  return (
    <ChapterContext.Provider value={{ sourates, isSourateLoading, triggerChapterFetch }}>
      {children}
    </ChapterContext.Provider>
  );
};

// Create a custom hook that shorthands the context!
export const useChapters = () => {
  const context = useContext(ChapterContext);
  if (!context) {
    const errorMessage = "useChapters must be used within a SourateProvider";
    Logger.error(errorMessage, null, { tag: 'ChapterContext' });
    throw new Error(errorMessage);
  }
  return context;
};
