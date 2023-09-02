import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export async function checkChapter(
  kalima: string,
  verse_no: number,
  chapter_no: number,
  discriminant: string,
) {
  try {
    // console.log('Checking : ', kalima, verse_no, chapter_no, discriminant);
    const networkState = await NetInfo.fetch();
    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }
    const url = `${Config.DOMAIN}/check_chapter?kalima=${kalima}&verse_no=${verse_no}&selected_chapter_no=${chapter_no}&discriminant=${discriminant}`;
    // console.log('URL : ', url);
    const response = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const result = await response.json();
    console.log('API check chapter result : ', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
