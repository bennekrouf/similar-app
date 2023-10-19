import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Chapter } from '../models/interfaces';
import { loadChapters } from '../api/loadChapters';

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
      } catch (error) {
        console.log('Error fetching data:', error);
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
    throw new Error("useChapters must be used within a ChapterProvider");
  }
  return context;
};
