import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

const key = (chapterNo) => `lessons-${chapterNo}`;

export async function loadLessons(chapterNo = 59) {
  AsyncStorage.removeItem(key(chapterNo));
  try {
    let lessons: any[];
    const networkState = await NetInfo.fetch();
    const cachedData = await AsyncStorage.getItem(key(chapterNo));
    if ((!networkState.isConnected && !networkState.isInternetReachable) || cachedData) {
      console.log('LOADING SIMILARS FROM CACHE');
      if (cachedData) {
        console.log('Getting data from cache');
        lessons = JSON.parse(cachedData);
      }
      return lessons;
    }
    console.log(
      'FETCH Config.DOMAIN/similars: ',
      `${Config.DOMAIN}/similars/${chapterNo}`,
    );
    const lessonsAPI = await fetch(`${Config.DOMAIN}/similars/${chapterNo}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    lessons = await lessonsAPI.json();
    AsyncStorage.setItem(key(chapterNo), JSON.stringify(lessons));
    AsyncStorage.setItem('lessons_dates', `${new Date()}`);
    return lessons.filter(s => s);
  } catch (error) {
    console.error('Error fetching data5:', error);
  } finally {
  }
}