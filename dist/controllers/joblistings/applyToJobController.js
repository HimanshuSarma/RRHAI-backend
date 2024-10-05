"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobListingValidations_1 = require("../../schemaValidations/jobListingValidations");
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const applyToJobController = {
    validation: async (req, res, next) => {
        try {
            await jobListingValidations_1.applyToJobValidation.parseAsync(req?.body);
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
            const updateJobApplications = await global?.DBModels?.JOB_LISTING?.findOneAndUpdate({
                _id: new mongoose_1.default.Types.ObjectId(req?.body?._id)
            }, {
                $push: {
                    applications: {
                        ...req?.body,
                        applicantId: new mongoose_1.default.Types.ObjectId(req?.user?._id?.toString() || "")
                    }
                }
            }, { new: true });
            if (updateJobApplications?._id) {
                res?.status(200)?.json({
                    message: "Applied to job successfully!",
                    payload: updateJobApplications
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
exports.default = applyToJobController;
