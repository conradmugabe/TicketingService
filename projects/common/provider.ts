import Database from "./database";
import IProvider from "./interfaces/provider";

export default class Provider {
  private static _instance: Provider;
  private _database: Database | any;

  setUp = (services: IProvider) => {
    this._database = services.database;
  };

  getDatabase = () => {
    return this._database;
  };

  static getInstance = (): Provider => {
    if (!this._instance) {
      this._instance = new Provider();
    }
    return this._instance;
  };
}
