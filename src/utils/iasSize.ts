import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSizeOfAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    
    let totalSize = 0;
    stores.map((result, i, store) => {
      // Get key and value
      let key = store[i][0];
      let value = store[i][1];

      // Size calculation
      const sizeInBytes = key.length + value.length;
      totalSize += sizeInBytes;
    });

    console.log('Total size in bytes:', totalSize);
    return totalSize;

  } catch (error) {
    console.error('Failed to get size of AsyncStorage:', error);
    return 0;
  }
}
