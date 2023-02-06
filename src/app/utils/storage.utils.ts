//one class of storage utilities
export class StorageUtil {
  
  /**
   * Save user to localStorage
   * @param key  : string 
   * @param value  : T
   */
  public static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * Read user data from storage
   * @param key :string
   * @returns user object
   */
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
  /**
   * remove user when logout
   * @param key : string
   */
  public static storageRemove(key: string): void {
    localStorage.removeItem(key)
  }
}


