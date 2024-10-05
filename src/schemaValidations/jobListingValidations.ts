import { z } from "zod";

const createJobListingValidation = z.object({
  title: z.string(),
  description: z.string(),
  requirements: z.array(
    z.string()
  ),
  salary: z.number(),
  location: z.string(),
});

const updateJobListingValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  requirements: z.array(
    z.string()
  ).optional(),
  salary: z.number().optional(),
  location: z.string().optional(),
});

const getJobListingValidation = z.object({
  _id: z.string().optional(),
  name: z.string().optional()
});

const getJobListingByIdValidation = z.object({
  _id: z.string().optional(),
});

const deleteJobListingValidation = z.object({
  _id: z.string()
});

const applyToJobValidation = z.object({
  _id: z.string(),
  description: z.string()
});

export {
  createJobListingValidation,
  updateJobListingValidation,
  getJobListingValidation,
  deleteJobListingValidation,
  getJobListingByIdValidation,
  applyToJobValidation
};