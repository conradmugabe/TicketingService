import Database from "./database";
import Provider from "./provider";

export default class BaseService {
  protected static _instance: BaseService;
  protected _database: Database;

  constructor(provider: Provider) {
    this._database = provider.getDatabase();
  }

  getAll = async <T>(filters: any): Promise<T[]> => {
    return await this._database.readAll<T>(filters);
  };

  getById = async <T>(id: string): Promise<T> => {
    const result = await this._database.read<T>(id);
    if (!result) {
      throw new Error("No project found");
    }
    return result;
  };

  deleteById = async (id: string): Promise<void> => {
    return await this._database.delete(id);
  };

  static getInstance = (provider: Provider): BaseService => {
    if (!this._instance) {
      this._instance = new BaseService(provider);
    }
    return this._instance;
  };
}
