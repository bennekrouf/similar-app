import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';  // Import the apiClient

export async function checkChapter(
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
    Logger.info('Initiating chapter check', logPayload, { tag: 'ChapterCheck' });

    const endpoint = `check_chapter?kalima=${kalima}&verse_no=${verse_no}&selected_chapter_no=${chapter_no}&discriminant=${discriminant}`;
    
    // Using the apiClient here. If you want to cache this request, pass 'true' as the second argument.
    const result = await apiClient.get(endpoint, true);
    
    Logger.info('Received chapter check result', { result }, { tag: 'ChapterCheck' });
    return result;

  } catch (error) {
    const errorMessage = 'Error occurred during chapter check.';
    Logger.error(errorMessage, error, { tag: 'ChapterCheck' });
    throw error;
  }
}
