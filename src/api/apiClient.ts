import { isInternetReachable } from './netUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// const BASE_URL = (Config.DOMAIN || 'http://127.0.0.1:7000').replace(/\/+$/, '');
const BASE_URL = 'http://test.similar.mayorana.ch/';

async function request(endpoint: string, method = 'GET', body?: any, cache?: boolean) {
  const cacheKey = `${method}_${endpoint}`;
  const dateKey = `${cacheKey}_date`;

  if (!(await isInternetReachable())) {
    if (cache) {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      if (cachedData) {
        const cachedDate = await AsyncStorage.getItem(dateKey);
        return {
          data: JSON.parse(cachedData),
          date: cachedDate
        };
      }
      throw new Error('No internet connection available and no cache found.');
    }
    throw new Error('No internet connection available.');
  }

  const headers = {
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  };

   // Ensure correct URL formation
   const url = `${BASE_URL}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;

   // Setup request configuration
   const config: RequestInit = {
     method,
     headers: {
      'Content-Type': 'application/json',
     },
   };
 
   if (body) {
     config.body = JSON.stringify(body);
   }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();

    if (cache) {
      const currentDate = new Date().toISOString();
      await AsyncStorage.setItem(cacheKey, JSON.stringify(responseData));
      await AsyncStorage.setItem(dateKey, currentDate);
    }

    return responseData;
  } catch (error) {
    if (cache) {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      const cachedDate = await AsyncStorage.getItem(dateKey);
      if (cachedData) {
        return {
          data: JSON.parse(cachedData),
          date: cachedDate
        };
      } else {
        throw error;
      }
    }
    throw error;
  }
}

export const apiClient = {
  get: (endpoint: string, queryParams = {}, cache = false) => {
    queryParams = queryParams || {};
    // Filter out entries with undefined values
    const filteredParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== undefined)
    ) as Record<string, string>;

    // Construct query string from filtered queryParams object
    const queryString = new URLSearchParams(filteredParams).toString();
    const urlWithQuery = queryString ? `${endpoint}?${queryString}` : endpoint;
    return request(urlWithQuery, 'GET', undefined, cache);
  },
  post: (endpoint: string, body: any, cache = false) => request(endpoint, 'POST', body, cache),
  put: (endpoint: string, body: any, cache = false) => request(endpoint, 'PUT', body, cache),
  delete: (endpoint: string, cache = false) => request(endpoint, 'DELETE', undefined, cache),
};

export const flushCache = async () => {
  try {
    // Retrieve all keys
    const keys = await AsyncStorage.getAllKeys();

    const cacheKeys = keys.filter(key => 
      key.startsWith('GET_') || key.startsWith('POST_')
    );
    // Remove filtered keys
    await AsyncStorage.multiRemove(cacheKeys);

    console.log('Cache flushed successfully');
  } catch (error) {
    console.error('Error flushing cache:', error);
  }
};