import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export async function checkChapter(
  kalima: string,
  ayah: number,
  chapter_no: number,
) {
  try {
    // console.log('Checking : ', kalima, ayah, chapter_no, discriminant);
    const networkState = await NetInfo.fetch();
    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }

    const response = await fetch(
      `${Config.DOMAIN}/check_chapter?kalima=${kalima}&ayah=${ayah}&selected_chapter_no=${chapter_no}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    );
    const result = await response.json();
    console.log('Check chapter result : ', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
