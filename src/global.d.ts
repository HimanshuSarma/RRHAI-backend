import "express"; // Modifies global namespace, so include it!
import { Model } from "mongoose";
import { IDBModels } from "./db/schemaTypes";
import { IUser } from "./models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      token: string,
      UserID: string,
      user: any
    }
  }

  /* Global variables follow. They *must* use var to work.
      and cannot be initialized here. */
  // eslint-disable-next-line no-var
  var DBModels: IDBModels;
}

export { };