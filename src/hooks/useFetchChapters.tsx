import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Chapter } from '../models/interfaces';
import { loadChapters } from '../api/loadChapters';
import { Logger } from 'mayo-logger'; 

interface ChapterContextProps {
  chapters: Chapter[];
  isLoading: boolean;
}

const ChapterContext = createContext<ChapterContextProps | null>(null);

interface ChapterProviderProps {
  children: ReactNode;
}

// Create a provider component
export const ChapterProvider: React.FC<ChapterProviderProps> = ({ children }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const chaptersData = await loadChapters();
        setChapters(chaptersData);
        Logger.info('Chapters data successfully fetched and set.', null, { tag: 'ChapterContext' });
      } catch (error) {
        const errorMessage = 'Error occurred while fetching chapters data.';
        Logger.error(errorMessage, error, { tag: 'ChapterContext' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ChapterContext.Provider value={{ chapters, isLoading }}>
      {children}
    </ChapterContext.Provider>
  );
};

// Create a custom hook that shorthands the context!
export const useChapters = () => {
  const context = useContext(ChapterContext);
  if (!context) {
    const errorMessage = "useChapters must be used within a ChapterProvider";
    Logger.error(errorMessage, null, { tag: 'ChapterContext' });
    throw new Error(errorMessage);
  }
  return context;
};
