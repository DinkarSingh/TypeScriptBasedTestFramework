class ThreadLocal {

    private static storage = new Map<number, any>();
  
    public get<T>(id: number) {
      return ThreadLocal.storage.get(id) as T;
    }
  
    public set<T>(id: number, value: T) {
      ThreadLocal.storage.set(id, value);
      return this;
    }
  
    public delete(id: number) {
      ThreadLocal.storage.delete(id);
      return this;
    }
  }
  
  export const ThreadLocalStorage = new ThreadLocal();
  