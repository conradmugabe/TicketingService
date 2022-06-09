import IDatabase from "./interfaces/database";

export default class Database {
  private static _instance: Database;
  private _database: IDatabase;

  private constructor(database: IDatabase) {
    this._database = database;
  }

  create = async <T, R>(data: T): Promise<R> => {
    return await this._database.create(data);
  };

  read = async <T>(
    filter: string | Record<string, string | number>
  ): Promise<T | null> => {
    return await this._database.read(filter);
  };

  readAll = async <T>(filters?: any): Promise<T[]> => {
    return await this._database.readAll(filters);
  };

  update = async <T, R>(
    filter: Record<string, string | number> | string,
    data: T
  ): Promise<R | null> => {
    return await this._database.update(filter, data);
  };

  delete = async (id: string): Promise<void> => {
    return await this._database.delete(id);
  };

  static getInstance = (database: IDatabase): Database => {
    if (!this._instance) {
      this._instance = new Database(database);
    }
    return this._instance;
  };
}
