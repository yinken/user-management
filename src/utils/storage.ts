import mapValues from 'lodash/mapValues';
import { roughSizeOfObject } from './common';

const createStorage = (isLsAvailable: () => boolean) => {
  /**
   * Functions to calculate how much space each key is taking
   */
  const getAllKeysSizes = () =>
    mapValues(localStorage, (keyAndValue) => {
      const value = keyAndValue[1];
      return roughSizeOfObject(value);
    });

  const get = (key: string) => localStorage.getItem(key);
  const set = <T>(key: string, value: T) => {
    if (isLsAvailable()) {
      try {
        const formattedValue =
          typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, formattedValue);
      } catch (e) {
        const options = {
          announcement: undefined,
          payload: {},
        };
        if (
          e instanceof DOMException &&
          e.code === DOMException.QUOTA_EXCEEDED_ERR
        ) {
          options.payload = getAllKeysSizes();
        }
      }
    }
  };
  const remove = (key: string) => localStorage.removeItem(key);
  const clear = () => localStorage.clear();

  return { set, get, remove, clear };
};

const createTempStorage = () => {
  const tempStorage: Record<string, unknown> = {};

  const get = <T>(key: string): T => tempStorage[key] as T;
  const set = <T>(key: string, value: T) => {
    tempStorage[key] = value;
  };
  const remove = (key: string) => {
    delete tempStorage[key];
  };

  return { get, set, remove };
};

const initStorage = () => {
  const isLsAvailable = () => 'localStorage' in window;
  const persistentStorage = createStorage(isLsAvailable);
  const tempStorage = createTempStorage();

  if (isLsAvailable()) {
    persistentStorage.remove('avatars');
  }

  return {
    persistentStorage,
    tempStorage,
    isLsAvailable,
  };
};

export const { persistentStorage, tempStorage, isLsAvailable } = initStorage();
