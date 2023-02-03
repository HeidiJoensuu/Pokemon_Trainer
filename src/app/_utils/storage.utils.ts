//one class of storage utilities
export class StorageUtil {
  //save user
  public static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  //read user
  public static storageRead<T>(key: string): T | undefined {
    const storedValue = localStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
      return undefined;
    } catch (error) {
      localStorage.removeItem(key);
      return undefined;
    }
  }
  //remove user
  public static storageRemove(key: string): void {
    localStorage.removeItem(key)
  }
}


