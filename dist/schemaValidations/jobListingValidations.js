"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyToJobValidation = exports.getJobListingByIdValidation = exports.deleteJobListingValidation = exports.getJobListingValidation = exports.updateJobListingValidation = exports.createJobListingValidation = void 0;
const zod_1 = require("zod");
const createJobListingValidation = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    requirements: zod_1.z.array(zod_1.z.string()),
    salary: zod_1.z.number(),
    location: zod_1.z.string(),
});
exports.createJobListingValidation = createJobListingValidation;
const updateJobListingValidation = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    requirements: zod_1.z.array(zod_1.z.string()).optional(),
    salary: zod_1.z.number().optional(),
    location: zod_1.z.string().optional(),
});
exports.updateJobListingValidation = updateJobListingValidation;
const getJobListingValidation = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional()
});
exports.getJobListingValidation = getJobListingValidation;
const getJobListingByIdValidation = zod_1.z.object({
    _id: zod_1.z.string().optional(),
});
exports.getJobListingByIdValidation = getJobListingByIdValidation;
const deleteJobListingValidation = zod_1.z.object({
    _id: zod_1.z.string()
});
exports.deleteJobListingValidation = deleteJobListingValidation;
const applyToJobValidation = zod_1.z.object({
    _id: zod_1.z.string(),
    description: zod_1.z.string()
});
exports.applyToJobValidation = applyToJobValidation;
