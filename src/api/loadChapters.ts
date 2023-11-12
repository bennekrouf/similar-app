import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';
import { userSouratesSettings } from '../components/userSouratesSettings';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export async function loadChapters() {
  try {
    const settings = await userSouratesSettings();
    const indices = getIndicesByName(settings);
    const ranges = convertIndicesToRanges(indices);
    const rangesParam = ranges.join(',');
    const url = `chapters?ranges=${encodeURIComponent(rangesParam)}`;

    // Use apiClient to fetch chapters
    const chapters = await apiClient.get(url);
    // const chapters = await apiClient.get('chapters');
    Logger.info(`Successfully fetched and/or retrieved chapter data from cache/API.`, null, { tag: 'loadChapters' });

    return chapters.filter(c => c);

  } catch (error) {
    Logger.error(`Issue accessing or processing API data.`, error, { tag: 'loadChapters' });
    throw error;  // Propagate the error for further handling, if needed.
  }
}
