"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobListingValidations_1 = require("../../schemaValidations/jobListingValidations");
const zod_1 = require("zod");
const getJobListingController = {
    validation: async (req, res, next) => {
        try {
            await jobListingValidations_1.getJobListingValidation.parseAsync(req?.query);
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
            const filters = [];
            if (req?.query?._id) {
                filters?.push({ _id: new mongoose_1.default.Types.ObjectId(req?.query?._id?.toString()) });
            }
            if (req?.query?.name) {
                filters.push({ title: { $regex: req?.query?.name } });
            }
            else {
                filters.push({ title: { $regex: "" } });
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
exports.default = getJobListingController;
