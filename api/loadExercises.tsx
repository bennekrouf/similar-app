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

    const formattedExercise = exercise.map(item => ({
      kalima: item.kalima,
      pre: item.pre,
      //   discriminant: item.discriminant,
      post: item.post,
      chapter_name: item.chapter_name,
      ayah: item.ayah,
      chapter: item.chapter,
      responses: item[1],
    }));

    return formattedExercise;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
