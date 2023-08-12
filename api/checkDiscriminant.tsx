import NetInfo from '@react-native-community/netinfo';
const config = require('./config.json');

export async function checkDiscriminant(
  kalima: string,
  ayah: number,
  chapter_no: number,
  discriminant: string,
) {
  try {
    // console.log('Checking : ', kalima, ayah, chapter_no, discriminant);
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }

    const response = await fetch(
      `${config.domain}check_discriminant?kalima=${kalima}&ayah=${ayah}&chapter_no=${chapter_no}&discriminant=${discriminant}`,
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
