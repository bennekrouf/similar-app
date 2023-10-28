import Config from 'react-native-config';
import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';  // Import the apiClient

export async function loadExercise(kalima: string) {
  try {
    Logger.info('Initiating exercise load', { kalima }, { tag: 'ExerciseLoad' });

    const endpoint = `exercise/${kalima}`;

    // Using the apiClient with caching disabled (second parameter is set to false).
    const exercise = await apiClient.get(endpoint, false);
    
    Logger.info('Received exercise data', { exercise }, { tag: 'ExerciseLoad' });
    return exercise;

  } catch (error) {
    const errorMessage = 'Error occurred during exercise load.';
    Logger.error(errorMessage, error, { tag: 'ExerciseLoad' });
    throw error;
  }
}
