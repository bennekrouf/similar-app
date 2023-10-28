import { isInternetReachable } from './netUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const BASE_URL = Config.DOMAIN;

async function request(endpoint: string, method = 'GET', body?: any, cache?: boolean) {
  const cacheKey = `${method}_${endpoint}`;
  const dateKey = `${cacheKey}_date`;

  if (!(await isInternetReachable())) {
    if (cache) {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      const cachedDate = await AsyncStorage.getItem(dateKey);
      if (cachedData) {
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
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
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
      }
    }
    throw error;
  }
}

export const apiClient = {
  get: (endpoint: string, cache = false) => request(endpoint, 'GET', undefined, cache),
  post: (endpoint: string, body: any, cache = false) => request(endpoint, 'POST', body, cache),
  put: (endpoint: string, body: any, cache = false) => request(endpoint, 'PUT', body, cache),
  delete: (endpoint: string, cache = false) => request(endpoint, 'DELETE', undefined, cache),
};