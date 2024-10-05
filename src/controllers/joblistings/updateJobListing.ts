import { NextFunction, Request, Response } from "express";
import { updateJobListingValidation } from "../../schemaValidations/jobListingValidations";
import { z } from "zod";
import { IUpdateJobListingRequestBody, IUpdateJobListingRequestQueryParams } from "../../types/requestTypes/jobListingRequestTypes";
import mongoose from "mongoose";

const updateJobListingController = {
  validation: async (req: Request<any, any, IUpdateJobListingRequestBody, IUpdateJobListingRequestQueryParams>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await updateJobListingValidation.parseAsync(req?.body);
      next();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        res?.status(400)?.json({
          errorMessage: err?.issues?.map(issue => {
            console.log(issue, "zodIssue");
            return `${issue?.path} : ${issue?.message}`;
          })?.join("|"),
        })
      } else {
        res?.status(500)?.json({
          errorMessage: err?.message,
        })
      }
    }
  },
  handler: async (req: Request<any, any, IUpdateJobListingRequestBody, IUpdateJobListingRequestQueryParams>, res: Response, next: NextFunction) => {
    try {
      const updatedJobListing = await global?.DBModels?.JOB_LISTING?.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req?.query?._id?.toString())
      }, {
        ...req?.body
      }, { new: true });
      if (updatedJobListing?._id) {
        res?.status(200)?.json({
          message: "Updated job listing successfully!",
          payload: updatedJobListing
        })
      } else {
        res?.status(500)?.json({
          errorMessage: "Some error occured!"
        })
      }
    } catch (err: any) {
      res?.status(500)?.json({
        errorMessage: err?.message || "Some error occured!"
      });
    }
  }
};

export default updateJobListingController;