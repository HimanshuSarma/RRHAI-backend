import mongoose from "mongoose";

interface IJobApplication extends mongoose.Document {
  applicantId: mongoose.Schema.Types.ObjectId,
  description?: string
};

interface IJobListing extends mongoose.Document {
  title: string,
  description: string,
  requirements: Array<string>,
  salary: number,
  location: string,
  applications: Array<IJobApplication>
};

const JobApplicationSchema = new mongoose.Schema<IJobApplication>({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  description: { type: String, default: "" }
});

const JobListingSchema = new mongoose.Schema<IJobListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: Array<string>,
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  applications: [JobApplicationSchema]
}, {
  timestamps: true
});

export default JobListingSchema;
export {
  IJobListing
}