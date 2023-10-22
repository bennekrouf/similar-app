import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { Logger } from 'rn-logging'; 

export async function checkChapter(
  kalima: string,
  verse_no: number,
  chapter_no: number,
  discriminant: string,
) {
  try {
    const logPayload = {
      kalima,
      verse_no,
      chapter_no,
      discriminant
    };
    Logger.info('Initiating chapter check', logPayload, { tag: 'ChapterCheck' });

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const errorMessage = 'No internet connection';
      Logger.error(errorMessage, null, { tag: 'ChapterCheck' });
      throw new Error(errorMessage);
    }

    const url = `${Config.DOMAIN}/check_chapter?kalima=${kalima}&verse_no=${verse_no}&selected_chapter_no=${chapter_no}&discriminant=${discriminant}`;
    const response = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const result = await response.json();
    Logger.info('Received chapter check result', { result }, { tag: 'ChapterCheck' });
    return result;
  } catch (error) {
    const errorMessage = 'Error occurred during chapter check.';
    Logger.error(errorMessage, error, { tag: 'ChapterCheck' });
    throw error;
  }
}
