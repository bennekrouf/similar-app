import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonsPrefix } from "./lessonsPrefix";

export const flushAllLessonKeys = async () => {
  try {
    // Get all keys in AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Filter only lesson related keys
    const lessonKeys = keys.filter(key => key.startsWith(lessonsPrefix));

    // Remove each lesson key
    for (const lessonKey of lessonKeys) {
      await AsyncStorage.removeItem(lessonKey);
    }
  } catch (error) {
    console.error("Error removing lesson keys:", error.message);
  }
};
