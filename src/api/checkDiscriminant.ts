import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { Logger } from 'mayo-logger'; 

export async function checkDiscriminant(
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
    Logger.info('Initiating discriminant check', logPayload, { tag: 'DiscriminantCheck' });

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      const errorMessage = 'No internet connection';
      Logger.error(errorMessage, null, { tag: 'DiscriminantCheck' });
      throw new Error(errorMessage);
    }

    const url = `${Config.DOMAIN}/check_discriminant?kalima=${kalima}&verse_no=${verse_no}&chapter_no=${chapter_no}&discriminant=${discriminant}`;
    const response = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const result = await response.json();
    Logger.info('Received discriminant check result', { result }, { tag: 'DiscriminantCheck' });
    return result;
  } catch (error) {
    const errorMessage = 'Error occurred during discriminant check.';
    Logger.error(errorMessage, error, { tag: 'DiscriminantCheck' });
    throw error;
  }
}
