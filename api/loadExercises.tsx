import NetInfo from '@react-native-community/netinfo';

export async function loadExercise(kalima) {
  try {
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }

    const exerciseAPI = await fetch(
      `http://similar.mayorana.ch/exercise/${kalima}`,
    );
    const exercise = await exerciseAPI.json();
    console.log('Parsed json exo 0:', exercise[0]);
    console.log('Parsed json exo 1:', exercise[1]);
    return exercise;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
