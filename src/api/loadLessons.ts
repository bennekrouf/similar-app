import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { keyLesson } from './keyLesson';
import { checkAndRemoveOldData } from './checkAndRemoveOldData';
import { Logger } from 'rn-logging'; 

export async function loadLessons(chapterNo = 59) {
  checkAndRemoveOldData();
  try {
    let lessons: any[];
    const networkState = await NetInfo.fetch();
    const cachedData = await AsyncStorage.getItem(keyLesson(chapterNo));

    if ((!networkState.isConnected && !networkState.isInternetReachable) || cachedData) {
      if (cachedData) {
        Logger.info('Retrieving lesson data from cache.', { chapterNo }, { tag: 'Cache' });
        lessons = JSON.parse(cachedData);
      }
      return lessons;
    }

    if (!Config.DOMAIN) {
      throw new Error("Missing configuration parameter. Please ensure all necessary parameters are set and restart the application.");
    }

    Logger.info(`Fetching lesson data from API: ${Config.DOMAIN}/similars/${chapterNo}`, null, { tag: 'API' });

    const lessonsAPI = await fetch(`${Config.DOMAIN}/similars/${chapterNo}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    lessons = await lessonsAPI.json();

    AsyncStorage.setItem(keyLesson(chapterNo), JSON.stringify(lessons));
    AsyncStorage.setItem('lessons_dates', new Date().toISOString());

    return lessons.filter(s => s);
  } catch (error) {
    const errorMessage = `Lesson API call failed for chapter ${chapterNo} using endpoint: ${Config.DOMAIN}/similars/${chapterNo}`;
    Logger.error(errorMessage, error, { tag: 'API' });
    Logger.info(`Ensure you've set the correct environment file or try running 'yarn dev' or 'ENVFILE=.env.local yarn ios' or 'android'`, null, { tag: 'API' });

    return error;
  }
}
