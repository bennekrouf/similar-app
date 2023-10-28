import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';  // Assuming apiClient is in the same directory

export async function loadExercise(kalima: string) {
  try {
    Logger.info('Initiating exercise list load', { kalima }, { tag: 'ExerciseListLoad' });

    const endpoint = `exercise_list/${kalima}`;

    // Using the apiClient with caching disabled.
    const exercises = await apiClient.get(endpoint, false);
    
    Logger.info('Received exercise list data', { exercises }, { tag: 'ExerciseListLoad' });
    return exercises;

  } catch (error) {
    const errorMessage = 'Error occurred during exercise list load.';
    Logger.error(errorMessage, error, { tag: 'ExerciseListLoad' });
    throw error;
  }
}
