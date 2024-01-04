import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonsPrefix } from "./lessonsPrefix";

const MONTH_DURATION = 1;
const MAX_STORED_LESSONS = 20;

export const checkAndRemoveOldData = async () => {
  try {
    // Retrieve the stored date
    const storedDateString = await AsyncStorage.getItem('lessons_dates');
    
    if (!storedDateString) {
      // No stored date found, so we can exit
      return;
    }

    const storedDate = new Date(storedDateString);
    const currentDate = new Date();

    const differenceInMonths = ((currentDate.getFullYear() - storedDate.getFullYear()) * 12) + (currentDate.getMonth() - storedDate.getMonth());

    // Check all keys in AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Filter only lesson related keys
    const lessonKeys = keys.filter(key => key.startsWith(`${lessonsPrefix}`));

    if (differenceInMonths > MONTH_DURATION || lessonKeys.length > MAX_STORED_LESSONS) {
      // If date difference is more than MONTH_DURATION or number of lessons exceed the limit
      // Remove the lessons
      for (const lessonKey of lessonKeys) {
        await AsyncStorage.removeItem(lessonKey);
      }
    }
  } catch (error) {
    console.error("Error checking and removing old lessons:", error.message);
  }
};