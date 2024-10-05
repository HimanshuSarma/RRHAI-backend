import { NextFunction, Request, Response } from "express";
import { createJobListingValidation } from "../../schemaValidations/jobListingValidations";
import { z } from "zod";
import { ICreateJobListingRequestBody } from "../../types/requestTypes/jobListingRequestTypes";

const createJobListingController = {
  validation: async (req: Request<any, any, ICreateJobListingRequestBody>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await createJobListingValidation.parseAsync(req?.body);
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
  handler: async (req: Request<any, any, ICreateJobListingRequestBody>, res: Response, next: NextFunction) => {
    try {
      const createNewJobListing = await global?.DBModels?.JOB_LISTING?.create(req?.body);
      if (createNewJobListing?._id) {
        res?.status(200)?.json({
          message: "Created job listing successfully!",
          payload: createNewJobListing
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

export default createJobListingController;