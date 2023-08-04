import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

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

    const similarsAPI = await fetch(
      `http://similar.mayorana.ch/similars/${chapterNo}`,
    );
    similars = await similarsAPI.json();

    similars = similars.map(item => ({
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

const formatSimilars = (verses) => {
  return verses.map(verse => {
    return {
      ...verse,
      sourate: verse.sourate,
      chapter: verse.verse.chapter,
      ayah: verse.verse.ayah,
      text: verse.verse.text,
    };
  });
};