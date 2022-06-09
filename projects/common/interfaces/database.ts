export default interface Database {
  create: <T, R>(data: T) => Promise<R>;
  delete: (id: string) => Promise<void>;
  readAll: <T>(filters?: any) => Promise<T[]>;
  read: <T>(
    filter: Record<string, string | number> | string
  ) => Promise<T | null>;
  update: <T, R>(
    filter: Record<string, string | number> | string,
    data: T
  ) => Promise<R | null>;
}
