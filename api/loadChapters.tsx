import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export async function loadChapters() {
  try {
    let chapters: any;
    const networkState = await NetInfo.fetch();

    const cachedChapters = await AsyncStorage.getItem('chapters');
    if (cachedChapters !== null) {
      return JSON.parse(cachedChapters);
    }

    // // If there's no internet connection
    // if (!networkState.isConnected && !networkState.isInternetReachable) {
    //   const cachedChapters = await AsyncStorage.getItem('chapters');
    //   console.log('LOADING CHAPTERS FROM CACHE');
    //   if (cachedChapters) {
    //     chapters = JSON.parse(cachedChapters);
    //   }
    //   return;
    // }

    // console.log('config.domain11 : ', Config.DOMAIN);
    const chaptersAPI = await fetch(`${Config.DOMAIN}/chapters`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    chapters = await chaptersAPI.json();

    AsyncStorage.setItem('chapters', JSON.stringify(chapters));
    console.log('config.domain1 chapters: ', chapters);

    return chapters.filter(c => c);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
  }
}
