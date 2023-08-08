import NetInfo from '@react-native-community/netinfo';

export async function checkExercise(
  kalima: string,
  ayah: number,
  chapter: number,
  discriminant: string,
) {
  try {
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }

    const response = await fetch(
      `http://similar.mayorana.ch/check_discriminant?kalima=${kalima}&ayah=${ayah}&chapter=${chapter}&discriminant=${discriminant}`,
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
