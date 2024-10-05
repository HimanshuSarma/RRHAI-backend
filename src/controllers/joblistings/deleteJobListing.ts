import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { deleteJobListingValidation } from "../../schemaValidations/jobListingValidations";
import { z } from "zod";
import { IDeleteJobListingRequestQueryParams } from "../../types/requestTypes/jobListingRequestTypes";

const deleteJobListingController = {
  validation: async (req: Request<any, any, null, IDeleteJobListingRequestQueryParams>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await deleteJobListingValidation.parseAsync(req?.query);
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
  handler: async (req: Request<any, any, null, IDeleteJobListingRequestQueryParams>, res: Response, next: NextFunction) => {
    try {
      const deletedJobListing = await global?.DBModels?.JOB_LISTING?.deleteOne({
        _id: new mongoose.Types.ObjectId(req?.query?._id?.toString())
      });

      if (deletedJobListing?.acknowledged && deletedJobListing.deletedCount === 1) {
        res?.status(200)?.json({
          message: "Job listing deleted successfully"
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

export default deleteJobListingController;