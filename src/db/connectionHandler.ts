import mongoose, { Connection, Model } from "mongoose";
import { IDBModels } from "./schemaTypes";
import JobListingSchema, { IJobListing } from "../models/JobListingModel";
import UserSchema from "../models/UserModel";


const createConnectionHandler = async () => {
  try {
    const conn: Connection = mongoose.createConnection(process.env.MONGO_URI as string);
    conn.on("connected", () => {
      console.log("Db connected");
      const dbModels: IDBModels = {
        JOB_LISTING: conn.model("job_listing", JobListingSchema),
        USER: conn.model("users", UserSchema)
      };

      global.DBModels = dbModels;
    });

    conn.on("error", () => {
      console.log("Some error occured in connecting to the DB. Exiting");
      process.exit(0);
    });
  } catch (err: any) {
    console.error(err, "DB connection error!");
  }
};

export default createConnectionHandler;