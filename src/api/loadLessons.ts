import Config from 'react-native-config';
import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';
import { checkAndRemoveOldData } from './checkAndRemoveOldData';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export async function loadLessons(chapterNo = 59, ranges: string[]) {
  checkAndRemoveOldData();
  try {
    const indices = getIndicesByName(ranges);
    let lessons: any[];
    lessons = await apiClient.get(`similars/${chapterNo}`, {ranges: convertIndicesToRanges(indices)}, true);

    if (lessons) {
      Logger.info(`Successfully fetched and/or retrieved lesson data from cache/API.`, { chapterNo }, { tag: 'loadLessons' });
      return lessons.filter(s => s);
    } else {
      throw new Error('No lessons data available.');
    }

  } catch (error) {
    const errorMessage = `Lesson API call failed for sourate ${chapterNo} using endpoint: ${Config.DOMAIN}/similars/${chapterNo}`;
    Logger.error(errorMessage, error, { tag: 'loadLessons' });
    Logger.info(`Ensure you've set the correct environment file or try running 'yarn dev' or 'ENVFILE=.env.local yarn ios' or 'android'`, null, { tag: 'loadLessons' });

    return error;
  }
}
