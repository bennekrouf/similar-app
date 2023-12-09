import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export async function loadChapters(knownSourates: string[]) {
  try {
    const indices = getIndicesByName(knownSourates);
    // Use apiClient to fetch chapters
    const chapters = await apiClient.get('chapters', {ranges: convertIndicesToRanges(indices)}, true);
    Logger.info(`Successfully fetched and/or retrieved chapter data from cache/API.`, null, { tag: 'loadChapters' });

    return chapters.filter(c => c);
  } catch (error) {
    Logger.error(`Issue accessing or processing API data.`, error, { tag: 'loadChapters' });
    throw error;  // Propagate the error for further handling, if needed.
  }
}
