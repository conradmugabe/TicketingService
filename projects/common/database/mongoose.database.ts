import { Model, connect } from "mongoose";
import Database from "../interfaces/database";

export default class MongoDatabase implements Database {
  private _model: any;
  private static _instance: MongoDatabase;

  static connect = async (uri: string): Promise<void> => {
    await connect(uri);
    console.log("Connected to MongoDB");
  };

  create = async <T, R>(data: T): Promise<R> => {
    const result = await this._model.create(data);
    await this._model.save();
    return result;
  };

  read = async <T>(
    filter: Record<string, string | number> | string
  ): Promise<T | null> => {
    if (typeof filter === "string") {
      return await this._model.findById(filter);
    }
    return await this._model.findOne(filter);
  };

  readAll = async <T>(filters?: any): Promise<T[]> => {
    return await this._model.find(filters);
  };

  update = async <T, R>(
    filter: Record<string, string | number> | string,
    data: T
  ): Promise<R | null> => {
    if (typeof filter === "string") {
      const result = await this._model.findByIdAndUpdate(filter, data);
      await this._model.save();
      return result;
    }
    const result = await this._model.updateOne(filter, data);
    await this._model.save();
    return result;
  };

  delete = async (id: string): Promise<void> => {
    return await this._model.findByIdAndDelete(id);
  };

  setModal = <T>(model: Model<T>): void => {
    this._model = model;
  };

  static getInstance = <T>(model: Model<T>): MongoDatabase => {
    if (!this._instance) {
      this._instance = new MongoDatabase();
      this._instance.setModal(model);
    }
    return this._instance;
  };
}
