import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string,
  password: string,
  jobApplications: Array<mongoose.Schema.Types.ObjectId>,
  userRole: "admin" | "client"
};

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  jobApplications: Array<mongoose.Schema.Types.ObjectId>,
  userRole: { type: String, enum: ["admin", "client"], required: true }
}, {
  timestamps: true
});

export default UserSchema;
export type {
  IUser
}