import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { keyLesson } from './keyLesson';
import { checkAndRemoveOldData } from './checkAndRemoveOldData';
import { Logger } from 'mayo-logger'; 

export async function loadLessons(chapterNo = 59) {
  checkAndRemoveOldData();
  try {
    let lessons: any[];
    const networkState = await NetInfo.fetch();
    const cachedData = await AsyncStorage.getItem(keyLesson(chapterNo));

    if ((!networkState.isConnected && !networkState.isInternetReachable) || cachedData) {
      if (cachedData) {
        Logger.info('Retrieving lesson data from cache.', { chapterNo }, { tag: 'loadLessons' });
        lessons = JSON.parse(cachedData);
      }
      return lessons;
    }

    if (!Config.DOMAIN) {
      throw new Error("Missing configuration parameter. Please ensure all necessary parameters are set and restart the application.");
    }

    Logger.info(`Attempting to fetch lesson data from API: ${Config.DOMAIN}/similars/${chapterNo}`, null, { tag: 'loadLessons' });

    const lessonsAPI = await fetch(`${Config.DOMAIN}/similars/${chapterNo}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (lessonsAPI.ok) {
      Logger.info(`Successfully fetched lesson data from API.`, null, { tag: 'loadLessons' });
    } else {
      Logger.warn(`Fetching lesson data returned status ${lessonsAPI.status}: ${lessonsAPI.statusText}`, null, { tag: 'loadLessons' });
    }

    Logger.info(`Attempting to parse fetched data from API.`, null, { tag: 'loadLessons' });

    lessons = await lessonsAPI.json();

    Logger.info(`Successfully parsed lesson data from API. Attempting to cache data for offline use.`, null, { tag: 'loadLessons' });

    await AsyncStorage.setItem(keyLesson(chapterNo), JSON.stringify(lessons));
    await AsyncStorage.setItem('lessons_dates', new Date().toISOString());

    Logger.info(`Lesson data cached successfully.`, null, { tag: 'loadLessons' });

    return lessons.filter(s => s);
  } catch (error) {
    const errorMessage = `Lesson API call failed for chapter ${chapterNo} using endpoint: ${Config.DOMAIN}/similars/${chapterNo}`;
    Logger.error(errorMessage, error, { tag: 'loadLessons' });
    Logger.info(`Ensure you've set the correct environment file or try running 'yarn dev' or 'ENVFILE=.env.local yarn ios' or 'android'`, null, { tag: 'loadLessons' });

    return error;
  }
}
