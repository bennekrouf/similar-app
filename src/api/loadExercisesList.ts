import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';

export async function loadExercise(ranges?: string) {
  try {
    Logger.info('Initiating exercise list load', { ranges }, { tag: 'ExerciseListLoad' });
    const exercises = await apiClient.get('exercise_list', { ranges }, false);
    
    Logger.info('Received exercise list data', { exercises }, { tag: 'ExerciseListLoad' });
    return exercises;

  } catch (error) {
    const errorMessage = 'Error occurred during exercise list load.';
    Logger.error(errorMessage, error, { tag: 'ExerciseListLoad' });
    throw error;
  }
}
