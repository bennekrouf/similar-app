import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';

export async function checkDiscriminant(
  kalima: string,
  verse_no: number,
  chapter_no: number,
  discriminant: string,
) {
  try {
    const logPayload = {
      kalima,
      verse_no,
      chapter_no,
      discriminant
    };

    Logger.info('Initiating discriminant check', logPayload, { tag: 'DiscriminantCheck' });

    const endpoint = `check_discriminant?kalima=${kalima}&verse_no=${verse_no}&chapter_no=${chapter_no}&discriminant=${discriminant}`;

    // Using the apiClient with caching disabled.
    const result = await apiClient.get(endpoint, false);

    Logger.info('Received discriminant check result', { result }, { tag: 'DiscriminantCheck' });
    return result;

  } catch (error) {
    const errorMessage = 'Error occurred during discriminant check.';
    Logger.error(errorMessage, error, { tag: 'DiscriminantCheck' });
    throw error;
  }
}
