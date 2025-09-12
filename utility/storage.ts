import * as SecureStore from 'expo-secure-store';

import { Platform } from 'react-native';

export const saveData = async (key: string, value: any) => {
  const stringValue = JSON.stringify(value);

  if (Platform.OS === 'web') {
    localStorage.setItem(key, stringValue);
  } else {
    await SecureStore.setItemAsync(key, stringValue);
  }
};

export const getData = async (key: string) => {
  let result: string | null = null;

  if (Platform.OS === 'web') {
    result = localStorage.getItem(key);
  } else {
    result = await SecureStore.getItemAsync(key);
  }

  if (result) return JSON.parse(result);
  return null;
};

export const removeData = async (key: string) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};
