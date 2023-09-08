import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export async function loadExercise(kalima) {
  try {
    const networkState = await NetInfo.fetch();

    // If there's no internet connection
    if (!networkState.isConnected && !networkState.isInternetReachable) {
      throw new Error('No internet connection');
    }
    const exerciseAPI = await fetch(
      `${Config.DOMAIN}/exercise_list/${kalima}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    );
    // console.log(
    //   'Parsed json exo 00:',
    //   `${Config.DOMAIN}/exercise_list/${kalima}`,
    // );

    const exercises = await exerciseAPI.json();
    // console.log('Parsed json exo 0:', exercises[0]);
    // console.log('Parsed json exo 1:', exercise[1]);
    return exercises;
  } catch (error) {
    console.error('Error fetching data4:', error);
    throw error;
  }
}
