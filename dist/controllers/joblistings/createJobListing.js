"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jobListingValidations_1 = require("../../schemaValidations/jobListingValidations");
const zod_1 = require("zod");
const createJobListingController = {
    validation: async (req, res, next) => {
        try {
            await jobListingValidations_1.createJobListingValidation.parseAsync(req?.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                res?.status(400)?.json({
                    errorMessage: err?.issues?.map(issue => {
                        console.log(issue, "zodIssue");
                        return `${issue?.path} : ${issue?.message}`;
                    })?.join("|"),
                });
            }
            else {
                res?.status(500)?.json({
                    errorMessage: err?.message,
                });
            }
        }
    },
    handler: async (req, res, next) => {
        try {
            const createNewJobListing = await global?.DBModels?.JOB_LISTING?.create(req?.body);
            if (createNewJobListing?._id) {
                res?.status(200)?.json({
                    message: "Created job listing successfully!",
                    payload: createNewJobListing
                });
            }
            else {
                res?.status(500)?.json({
                    errorMessage: "Some error occured!"
                });
            }
        }
        catch (err) {
            res?.status(500)?.json({
                errorMessage: err?.message || "Some error occured!"
            });
        }
    }
};
exports.default = createJobListingController;
