"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobListingValidations_1 = require("../../schemaValidations/jobListingValidations");
const zod_1 = require("zod");
const deleteJobListingController = {
    validation: async (req, res, next) => {
        try {
            await jobListingValidations_1.deleteJobListingValidation.parseAsync(req?.query);
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
            const deletedJobListing = await global?.DBModels?.JOB_LISTING?.deleteOne({
                _id: new mongoose_1.default.Types.ObjectId(req?.query?._id?.toString())
            });
            if (deletedJobListing?.acknowledged && deletedJobListing.deletedCount === 1) {
                res?.status(200)?.json({
                    message: "Job listing deleted successfully"
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
exports.default = deleteJobListingController;
