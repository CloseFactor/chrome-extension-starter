/**
 * A simple service to interact with the session storage of the extension.
 */
export class SessionStorageService {
  async set<T>(key: string, value: T): Promise<void> {
    return chrome.storage.session.set({ [key]: value });
  }

  async get<T>(key: string): Promise<T> {
    return chrome.storage.session.get(key).then((result) => {
      return Promise.resolve(result[key] as T);
    });
  }

  async delete(key: string): Promise<void> {
    return chrome.storage.session.remove(key);
  }

  async getFromMap<T>(mapName: string, key: string): Promise<T | undefined> {
    return this.get<any>(mapName).then((mapObject) => {
      const map = this.marshallMap<T>(mapObject);
      if (!map || !map.has(key)) {
        return undefined;
      }
      return Promise.resolve(map.get(key));
    });
  }

  async setToMap<T>(mapName: string, key: string, value: T): Promise<void> {
    return this.get<any>(mapName).then(async (mapObject) => {
      const map = this.marshallMap<T>(mapObject);
      map.set(key, value);
      await this.set<any>(mapName, Object.fromEntries(map.entries()));
      return Promise.resolve();
    });
  }

  async removeFromMap<T>(mapName: string, key: string): Promise<T | undefined> {
    return this.get<any>(mapName).then(async (mapObject) => {
      const map = this.marshallMap<T>(mapObject);
      if (!map.has(key)) {
        return Promise.resolve(undefined);
      }
      const deletedValue = map.get(key);
      map.delete(key);
      await this.set<any>(mapName, Object.fromEntries(map.entries()));
      return Promise.resolve(deletedValue);
    });
  }

  async setToArray<T>(arrayName: string, item: T) {
    this.get<Array<T>>(arrayName).then(async (array) => {
      if (!array) {
        array = new Array<T>();
      }
      array.push(item);
      await this.set<Array<T>>(arrayName, array);
      return Promise.resolve();
    });
  }

  async setAllToArray<T>(arrayName: string, items: Array<T>) {
    this.get<Array<T>>(arrayName).then(async (array) => {
      if (!array) {
        array = new Array<T>();
      }
      array.push(...items);
      await this.set<Array<T>>(arrayName, array);
      return Promise.resolve();
    });
  }

  marshallMap<T>(mapObject: any): Map<string, T> {
    const map = new Map<string, T>();
    if (!mapObject) {
      return map;
    }
    try {
      Object.entries(mapObject).forEach((v) => {
        const key = v[0];
        const value: T = v[1] as T;
        map.set(key, value);
      });
    } catch (e) {
      console.warn(`Failed to marshall map object`);
    }
    return map;
  }
}
