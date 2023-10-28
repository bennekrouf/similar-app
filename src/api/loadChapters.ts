import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';  // Import the apiClient

export async function loadChapters() {
  try {
    // Use apiClient to fetch chapters
    const chapters = await apiClient.get('chapters');

    Logger.info(`Successfully fetched and/or retrieved chapter data from cache/API.`, null, { tag: 'loadChapters' });

    return chapters.filter(c => c);

  } catch (error) {
    Logger.error(`Issue accessing or processing API data.`, error, { tag: 'loadChapters' });
    throw error;  // Propagate the error for further handling, if needed.
  }
}
