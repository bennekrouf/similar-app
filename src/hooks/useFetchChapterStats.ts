import { useState, useEffect, useContext } from 'react';
import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { useFetchUser } from './useFetchUser';
import { initialState } from '../models/UserState';
import { rangeParamsURI } from '../api/settingsToRanges';
import { apiClient } from '../api/apiClient';

const CHAPTER_STATS_URL = '/chapter_stats_analytics';

const useFetchChapterStats = () => {
  const [chapterStats, setChapterStats] = useState<any[] | null>(null);
  const [isChapterStatsLoading, setIsChapterStatsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(UserContext) as UserContextType;
  const [userState, setUserState, loading] = useFetchUser(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ranges = await rangeParamsURI();
        
        setIsChapterStatsLoading(true);

        Logger.info('Initiating chapter stats load', { ranges }, { tag: 'ChapterStatsLoad' });
        
        // Assuming apiClient.post can handle sending both query params and body as JSON
        const fetchedChapterStats = await apiClient.post(CHAPTER_STATS_URL, ranges);
        
        Logger.info('Received chapter stats data', { chapterStats: fetchedChapterStats }, { tag: 'ChapterStatsFetch' });

        setChapterStats(fetchedChapterStats);
      } catch (err) {
        const errorMessage = 'Error occurred during chapter stats load.';
        setError(errorMessage);
        Logger.error(errorMessage, err, { tag: 'ChapterStatsFetch' });
      } finally {
        setIsChapterStatsLoading(false);
      }
    };

    if (userState && user && !loading) {
      fetchData();
    }
  }, [user, userState, loading]);

  return { chapterStats, isChapterStatsLoading, error };
};

export default useFetchChapterStats;
