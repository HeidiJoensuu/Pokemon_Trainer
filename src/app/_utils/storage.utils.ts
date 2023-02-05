//one class of storage utilities
export class StorageUtil {
  //save user
  public static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  //read user
  public static storageRead<T>(key: string): {id?: number, username: string, pokemon?: string[]} {
    const storedValue = localStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return {username: ''};
    } catch (error) {
      localStorage.removeItem(key);
      return {username: ''};
    }
  }
  //remove user
  public static storageRemove(key: string): void {
    localStorage.removeItem(key)
  }
}


