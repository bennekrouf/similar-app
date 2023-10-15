import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export async function loadExercise(kalima) {
  try {
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }
    // console.log('Calling:', kalima);
    // console.log('config.domain2 : ', config.domain);

    const exerciseAPI = await fetch(`${Config.DOMAIN}/exercise/${kalima}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const exercise = await exerciseAPI.json();
    // console.log('Parsed json exo 0:', exercise[0]);
    // console.log('Parsed json exo 1:', exercise[1]);
    return exercise;
  } catch (error) {
    console.error('Error fetching data3:', error);
    throw error;
  }
}
