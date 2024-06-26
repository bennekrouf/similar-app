import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
const config = require('./config.json');

export async function loadChapters() {
  try {
    let chapters: any;
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const cachedChapters = await AsyncStorage.getItem('chapters');
      if (cachedChapters) {
        chapters = JSON.parse(cachedChapters);
      }
      return;
    }

    // console.log('config.domain11 : ', config.domain);

    const chaptersAPI = await fetch(`${config.domain}/chapters`);
    // console.log('config.domain1 chapters: ', chapters);
    chapters = await chaptersAPI.json();

    AsyncStorage.setItem('chapters', JSON.stringify(chapters));
    return chapters;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
  }
}
