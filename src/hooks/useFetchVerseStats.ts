import { useState, useEffect, useContext } from 'react';

import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { useFetchUser } from './useFetchUser';
import { initialState } from '../models/UserState';
import { rangeParamsURI } from '../api/settingsToRanges';
import { apiClient } from '../api/apiClient';

const VERSE_STATS_URL = '/verse_stats_analytics';

const useFetchVerseStats = () => {
  const [verseStats, setVerseStats] = useState<any[] | null>(null);
  const [isVerseStatsLoading, setIsVerseStatsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(UserContext) as UserContextType;
  const [userState, setUserState, loading] = useFetchUser(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ranges = await rangeParamsURI();
        
        setIsVerseStatsLoading(true);
        const body = { user_stats: userState?.knownSourates, ranges };
        
        Logger.info('Initiating verse stats load', { body }, { tag: 'VerseStatsLoad' });
        
        // Assuming apiClient.post can handle sending both query params and body as JSON
        const fetchedVerseStats = await apiClient.post(VERSE_STATS_URL, body);
        
        Logger.info('Received verse stats data', { verseStats: fetchedVerseStats }, { tag: 'VerseStatsFetch' });

        setVerseStats(fetchedVerseStats);
      } catch (err) {
        const errorMessage = 'Error occurred during verse stats load.';
        setError(errorMessage);
        Logger.error(errorMessage, err, { tag: 'VerseStatsFetch' });
      } finally {
        setIsVerseStatsLoading(false);
      }
    };

    if (userState && user && !loading) {
      fetchData();
    }
  }, [user, userState, loading]);

  return { verseStats, isVerseStatsLoading, error };
};

export default useFetchVerseStats;
