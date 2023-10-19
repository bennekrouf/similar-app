import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import {keyLesson} from'./keyLesson';
import {checkAndRemoveOldData} from './checkAndRemoveOldData';

export async function loadLessons(chapterNo = 59) {
  checkAndRemoveOldData();
  try {
    let lessons: any[];
    const networkState = await NetInfo.fetch();
    const cachedData = await AsyncStorage.getItem(keyLesson(chapterNo));
    if ((!networkState.isConnected && !networkState.isInternetReachable) || cachedData) {
      // console.log('LOADING SIMILARS FROM CACHE');
      if (cachedData) {
        console.log('Getting data from cache');
        lessons = JSON.parse(cachedData);
      }
      return lessons;
    }
    if(!Config.DOMAIN) {
      throw new Error("EH HO MISSING CONFIG PARAMA - RESTART");
    }

    console.log(`FETCH Config.DOMAIN/similars: ${Config.DOMAIN}/similars/${chapterNo}`);
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
    const errorMessage = `Lesson API call failed with parameters ${Config.DOMAIN}/similars/${chapterNo}`;
    console.error(errorMessage, error);
    console.log(`Try running yarn dev or ENVFILE=.env.local yarn ios or android`);
    return error;
  }
}