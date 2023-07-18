import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export async function loadAPI() {
  try {
    let chapters: any, similars;
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const cachedData = await AsyncStorage.getItem('similars');
      if (cachedData) {
        similars = JSON.parse(cachedData);
      }
      const cachedChapters = await AsyncStorage.getItem('chapters');
      if (cachedChapters) {
        chapters = JSON.parse(cachedChapters);
      }
      return;
    }

    const chaptersAPI = await fetch('http://similar.mayorana.ch/chapters');
    chapters = await chaptersAPI.json();

    const similarsAPI = await fetch('http://similar.mayorana.ch/similars');
    similars = await similarsAPI.json();

    similars = similars.map(item => ({
      kalima: item.kalima,
      verses: item.verses.map(item1 => {
        return {
          sourate: item1.sourate,
          chapter: item1.verse.chapter,
          background_color: chapters.find(c => c.no === item1.verse.chapter).background_color,
          font_color: chapters.find(c => c.no === item1.verse.chapter).font_color,
          ayah: item1.verse.ayah,
          text: item1.verse.text,
        };
      }),
    }));
    AsyncStorage.setItem('similars', JSON.stringify(similars));
    AsyncStorage.setItem('chapters', JSON.stringify(chapters));
    return {
      chapters,
      similars,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
  }
}
