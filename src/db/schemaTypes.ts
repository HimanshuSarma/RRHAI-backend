import { Model } from "mongoose";
import { IJobListing } from "../models/JobListingModel";
import { IUser } from "../models/UserModel";

interface IDBModels {
  JOB_LISTING: Model<IJobListing>,
  USER: Model<IUser>
};

export type {
  IDBModels
}
