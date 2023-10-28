import { checkAndRemoveOldData } from './checkAndRemoveOldData';
import { Logger } from 'mayo-logger'; 
import { apiClient } from './apiClient';
import Config from 'react-native-config';

export async function loadLessons(chapterNo = 59) {
  checkAndRemoveOldData();
  try {
    let lessons: any[];
    
    // Use apiClient to fetch lessons
    const endpoint = `similars/${chapterNo}`;
    lessons = await apiClient.get(endpoint, true);

    if (lessons) {
      Logger.info(`Successfully fetched and/or retrieved lesson data from cache/API.`, { chapterNo }, { tag: 'loadLessons' });
      return lessons.filter(s => s);
    } else {
      throw new Error('No lessons data available.');
    }

  } catch (error) {
    const errorMessage = `Lesson API call failed for chapter ${chapterNo} using endpoint: ${Config.DOMAIN}/similars/${chapterNo}`;
    Logger.error(errorMessage, error, { tag: 'loadLessons' });
    Logger.info(`Ensure you've set the correct environment file or try running 'yarn dev' or 'ENVFILE=.env.local yarn ios' or 'android'`, null, { tag: 'loadLessons' });

    return error;
  }
}
