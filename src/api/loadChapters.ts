import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { Logger } from 'rn-logging'; 

export async function loadChapters() {
  try {
    let chapters: any;
    const networkState = await NetInfo.fetch();
    const cachedChapters = await AsyncStorage.getItem('chapters');

    if ((!networkState.isConnected && !networkState.isInternetReachable) || cachedChapters) {
      Logger.info('Retrieving chapter data from cache.', null, { tag: 'Cache' });
      chapters = JSON.parse(cachedChapters);
      return chapters;
    }

    if (!Config.DOMAIN) {
      throw new Error("Missing configuration parameter. Please ensure all necessary parameters are set and restart the application.");
    }

    Logger.info(`Fetching chapter data from API: ${Config.DOMAIN}/chapters`, null, { tag: 'API' });

    const chaptersAPI = await fetch(`${Config.DOMAIN}/chapters`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    chapters = await chaptersAPI.json();

    AsyncStorage.setItem('chapters', JSON.stringify(chapters));
    AsyncStorage.setItem('chapters_dates', new Date().toISOString());

    return chapters.filter(c => c);
  } catch (error) {
    const errorMessage = `Chapter API call failed using endpoint: ${Config.DOMAIN}/chapters`;
    Logger.error(errorMessage, error, { tag: 'API' });

    return error;
  }
}
