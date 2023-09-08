import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import {withTextVar} from '../helpers/withTextVar';

export async function loadLessons(chapterNo = 2) {
  console.log(' CALLING loadLessons');
  try {
    let lessons: any[];
    const networkState = await NetInfo.fetch();
    // console.log('networkState: ', networkState);

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const cachedData = await AsyncStorage.getItem('lessons');
      console.log('LOADING SIMILARS FROM CACHE');
      if (cachedData) {
        console.log('Getting data from cache');
        lessons = JSON.parse(cachedData);
      }
      return;
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

    lessons = lessons?.map(item => ({
      ...item,
      similars: withTextVar(item.similars),
      verses: withTextVar(item.verses),
      opposites: withTextVar(item.opposites),
    }));
    AsyncStorage.setItem('lessons', JSON.stringify(lessons));
    return lessons.filter(s => s);
  } catch (error) {
    console.error('Error fetching data5:', error);
  } finally {
  }
}