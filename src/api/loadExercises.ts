import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { Logger } from 'mayo-logger'; 

export async function loadExercise(kalima: string) {
  try {
    Logger.info('Initiating exercise load', { kalima }, { tag: 'ExerciseLoad' });

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const errorMessage = 'No internet connection';
      Logger.error(errorMessage, null, { tag: 'ExerciseLoad' });
      throw new Error(errorMessage);
    }

    const url = `${Config.DOMAIN}/exercise/${kalima}`;
    const exerciseAPI = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const exercise = await exerciseAPI.json();
    Logger.info('Received exercise data', { exercise }, { tag: 'ExerciseLoad' });
    
    return exercise;
  } catch (error) {
    const errorMessage = 'Error occurred during exercise load.';
    Logger.error(errorMessage, error, { tag: 'ExerciseLoad' });
    throw error;
  }
}
