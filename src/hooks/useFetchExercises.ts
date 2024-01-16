import { useState, useEffect, useContext } from 'react';
import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { useFetchUser } from './useFetchUser';
import { initialState } from '../models/UserState';
import { rangeParamsURI } from '../api/settingsToRanges';
import { apiClient } from '../api/apiClient';

const useFetchExercises = () => {
  const [exercises, setExercises] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(UserContext) as UserContextType;
  const [userState, setUserState, loading] = useFetchUser(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userState || !user) {
            return;
        }
        const ranges = await rangeParamsURI();
        
        setIsLoading(true);
        Logger.info('Fetching exercises', { ranges }, { tag: 'ExercisesFetch' });

        Logger.info('Initiating exercise list load', { ranges }, { tag: 'ExerciseListLoad' });
        const fetchedExercises = await apiClient.get('exercise_list', { ranges }, false);
        Logger.info('Received exercise list data', { exercises }, { tag: 'ExerciseListLoad' });

        setExercises(fetchedExercises);
        Logger.info('Received exercise list data', { exercises: fetchedExercises }, { tag: 'ExercisesFetch' });
      } catch (err) {
        const errorMessage = 'Error occurred during exercise list load.';
        setError(errorMessage);
        Logger.error(errorMessage, err, { tag: 'ExercisesFetch' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, userState]);

  return { exercises, isLoading, error };
};

export default useFetchExercises;
