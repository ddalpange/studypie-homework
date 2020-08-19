import { isServer } from "./SSR";

export class LocalStorage {
  static getItem(key, defaultValue) {
    if (isServer()) {
      return defaultValue;
    }
    const item = window.localStorage.getItem(key);
    if (!item) {
      return defaultValue;
    }
    return JSON.parse(item);
  }

  static setItem(key, value) {
    if (isServer()) {
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
