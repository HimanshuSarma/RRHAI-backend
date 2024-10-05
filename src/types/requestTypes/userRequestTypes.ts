import mongoose from "mongoose";

interface IUserSignup {
  email: string,
  password: string,
  jobApplications: Array<mongoose.Schema.Types.ObjectId>
};

interface IUserLogin {
  email: string,
  password: string,
};

export type {
  IUserSignup,
  IUserLogin
};
