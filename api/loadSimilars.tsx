import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import config from './config.json';

export async function loadSimilars(chapterNo = 40) {
  try {
    let similars;
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const cachedData = await AsyncStorage.getItem('similars');
      if (cachedData) {
        similars = JSON.parse(cachedData);
      }
      return;
    }
    // console.log('config.domain3 : ', config.domain);
    const similarsAPI = await fetch(`${config.domain}similars/${chapterNo}`);
    // console.log('config.domain33 : ', similarsAPI);
    similars = await similarsAPI.json();
    
    similars = similars?.map(similar => ({
      kalima: similar.kalima,
      verses: formatSimilars(similar.verses),
      similars: formatSimilars(similar.similars),
      opposites: formatSimilars(similar.opposites),
    })).sort((a, b) => {
      const ayahA = a.verses[0].verse.ayah;
      const ayahB = b.verses[0].verse.ayah;
      return ayahB - ayahA;
    });
    AsyncStorage.setItem('similars', JSON.stringify(similars));
    return similars;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
  }
}

const formatSimilars = verses => {
  return verses.map(verse => {
    return {
      ...verse,
      sourate: verse.sourate,
      chapter_no: verse.verse.chapter_no,
      ayah: verse.verse.ayah,
      text: verse.verse.text,
    };
  });
};
