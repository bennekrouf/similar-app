import { useState, useEffect } from 'react';
import {loadChapters} from '../api/loadChapters';
import { Chapter } from '../models/interfaces';

const useFetchChapters = (): { chapters: Chapter[]; isLoading: boolean } => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      if(chapters?.length) {
        return chapters;
      };

      try {
        setIsLoading(true);
        const chaptersData = await loadChapters();
        setChapters(chaptersData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data6:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { chapters, isLoading };
};

export default useFetchChapters;
