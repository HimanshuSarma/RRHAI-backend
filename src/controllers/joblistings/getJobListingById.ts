import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getJobListingByIdValidation } from "../../schemaValidations/jobListingValidations";
import { z } from "zod";
import { IGetJobListingByIdRequestQueryParams } from "../../types/requestTypes/jobListingRequestTypes";

const getJobListingByIdController = {
  validation: async (req: Request<any, any, null, IGetJobListingByIdRequestQueryParams>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await getJobListingByIdValidation.parseAsync(req?.query);
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
  handler: async (req: Request<any, any, null, IGetJobListingByIdRequestQueryParams>, res: Response, next: NextFunction) => {
    try {
      const fetchedJobListing = await global?.DBModels?.JOB_LISTING.findOne({
        _id: new mongoose.Types.ObjectId(req?.query?._id)
      });

      if (fetchedJobListing?._id) {
        res?.status(200)?.json({
          message: "Job listing fetched successfully",
          payload: fetchedJobListing
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

export default getJobListingByIdController;