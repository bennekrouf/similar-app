import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { Logger } from 'mayo-logger'; 

export async function loadChapters() {
  let chapters: any;

  try {
    const networkState = await NetInfo.fetch();

    if (!Config.DOMAIN) {
      throw new Error("Missing configuration parameter. Please ensure all necessary parameters are set and restart the application.");
    }

    if (networkState.isConnected && networkState.isInternetReachable) {
      Logger.info(`Fetching chapter data from API: ${Config.DOMAIN}/chapters`, null, { tag: 'loadChapters' });

      const chaptersAPI = await fetch(`${Config.DOMAIN}/chapters`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!chaptersAPI.ok) {
        throw new Error(`Failed fetching chapter data from API: ${chaptersAPI.statusText}`);
      } else {
        Logger.info(`Successfully fetched chapter data from API.`, null, { tag: 'loadChapters' });
      }

      chapters = await chaptersAPI.json();

      Logger.info(`Successfully parsed chapter data from API. Caching for offline use.`, null, { tag: 'loadChapters' });

      // Save the chapters to AsyncStorage for offline access later.
      await AsyncStorage.setItem('chapters', JSON.stringify(chapters));
      await AsyncStorage.setItem('chapters_dates', new Date().toISOString());

      Logger.info(`Chapter data cached successfully.`, null, { tag: 'loadChapters' });

    } else {
      throw new Error('No internet connection available.');  // This will lead to the catch block where cached chapters will be retrieved.
    }

    return chapters.filter(c => c);

  } catch (apiError) {
    Logger.error(`Issue accessing or processing API data.`, apiError, { tag: 'loadChapters' });

    try {
      const cachedChapters = await AsyncStorage.getItem('chapters');

      if (cachedChapters) {
        Logger.info('Retrieving chapter data from cache due to API error.', null, { tag: 'loadChapters' });
        chapters = JSON.parse(cachedChapters);
        return chapters.filter(c => c);
      } else {
        throw new Error('No cached data available.');
      }

    } catch (storageError) {
      Logger.error(`Failed retrieving chapters from cache.`, storageError, { tag: 'loadChapters' });
      throw storageError;  // Propagate the error for further handling, if needed.
    }
  }
}
