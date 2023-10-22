import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { Logger } from 'rn-logging'; 

export async function loadExercise(kalima: string) {
  try {
    Logger.info('Initiating exercise list load', { kalima }, { tag: 'ExerciseListLoad' });

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const errorMessage = 'No internet connection';
      Logger.error(errorMessage, null, { tag: 'ExerciseListLoad' });
      throw new Error(errorMessage);
    }

    const url = `${Config.DOMAIN}/exercise_list/${kalima}`;
    const exerciseAPI = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const exercises = await exerciseAPI.json();
    Logger.info('Received exercise list data', { exercises }, { tag: 'ExerciseListLoad' });
    
    return exercises;
  } catch (error) {
    const errorMessage = 'Error occurred during exercise list load.';
    Logger.error(errorMessage, error, { tag: 'ExerciseListLoad' });
    throw error;
  }
}
