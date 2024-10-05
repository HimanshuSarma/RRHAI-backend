import { NextFunction, Request, Response } from "express";
import { applyToJobValidation } from "../../schemaValidations/jobListingValidations";
import { z } from "zod";
import { IApplyToJobRequestBody, ICreateJobListingRequestBody } from "../../types/requestTypes/jobListingRequestTypes";
import mongoose from "mongoose";

const applyToJobController = {
  validation: async (req: Request<any, any, IApplyToJobRequestBody>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await applyToJobValidation.parseAsync(req?.body);
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
  handler: async (req: Request<any, any, IApplyToJobRequestBody>, res: Response, next: NextFunction) => {
    try {
      const updateJobApplications = await global?.DBModels?.JOB_LISTING?.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req?.body?._id)
      }, {
        $push: {
          applications: {
            ...req?.body,
            applicantId: new mongoose.Types.ObjectId(req?.user?._id?.toString() || "")
          }
        }
      }, { new: true });

      if (updateJobApplications?._id) {
        res?.status(200)?.json({
          message: "Applied to job successfully!",
          payload: updateJobApplications
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

export default applyToJobController;