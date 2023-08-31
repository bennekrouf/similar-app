import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export async function loadSimilars(chapterNo = 2) {
  try {
    let similars: any[];
    const networkState = await NetInfo.fetch();
    // console.log('networkState: ', networkState);

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const cachedData = await AsyncStorage.getItem('similars');
      if (cachedData) {
        console.log('Getting data from cache');
        similars = JSON.parse(cachedData);
      }
      return;
    }
    console.log(
      'FETCH Config.DOMAIN/similars: ',
      `${Config.DOMAIN}/similars/${chapterNo}`,
    );
    const similarsAPI = await fetch(`${Config.DOMAIN}/similars/${chapterNo}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    similars = await similarsAPI.json();
    // console.log('SIMILARS :', similars);

    similars = similars?.map(item => ({
      kalima: item.kalima,
      verses: formatSimilars(item.verses),
      similars: formatSimilars(item.similars),
      opposites: formatSimilars(item.opposites),
    }));
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
      chapter_no: verse.chapter_no,
      ayah: verse.ayah,
      text: verse.text,
    };
  });
};
