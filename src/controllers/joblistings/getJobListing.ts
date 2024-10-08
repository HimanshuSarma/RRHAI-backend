import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getJobListingValidation } from "../../schemaValidations/jobListingValidations";
import { z } from "zod";
import { IGetJobListingRequestQueryParams } from "../../types/requestTypes/jobListingRequestTypes";

const getJobListingController = {
  validation: async (req: Request<any, any, null, IGetJobListingRequestQueryParams>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await getJobListingValidation.parseAsync(req?.query);
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
  handler: async (req: Request<any, any, null, IGetJobListingRequestQueryParams>, res: Response, next: NextFunction) => {
    try {

      const filters = [];

      if (req?.query?._id) {
        filters?.push(
          { _id: new mongoose.Types.ObjectId(req?.query?._id?.toString()) }
        )
      }

      if (req?.query?.name) {
        filters.push(
          { title: { $regex: req?.query?.name } }
        )
      } else {
        filters.push(
          { title: { $regex: "" } }
        )
      }

      const fetchedJobListing = await global?.DBModels?.JOB_LISTING.aggregate([{
        $match: {
          $or: filters
        }
      }]);
      if (fetchedJobListing?.length > 0) {
        res?.status(200)?.json({
          message: "Job listing fetched successfully",
          payload: fetchedJobListing
        })
      } else {
        res?.status(500)?.json({
          errorMessage: "No job listings found!"
        })
      }
    } catch (err: any) {
      console.log(err, "error");
      res?.status(500)?.json({
        errorMessage: err?.message || "Some error occured!"
      });
    }
  }
};

export default getJobListingController;