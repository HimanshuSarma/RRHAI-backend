"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createJobListing_1 = __importDefault(require("../controllers/joblistings/createJobListing"));
const getJobListing_1 = __importDefault(require("../controllers/joblistings/getJobListing"));
const updateJobListing_1 = __importDefault(require("../controllers/joblistings/updateJobListing"));
const deleteJobListing_1 = __importDefault(require("../controllers/joblistings/deleteJobListing"));
const getJobListingById_1 = __importDefault(require("../controllers/joblistings/getJobListingById"));
const verifyAuthenticationHandler_1 = __importDefault(require("../middlewares/verifyAuthenticationHandler"));
const applyToJobController_1 = __importDefault(require("../controllers/joblistings/applyToJobController"));
const jobListingRouter = express_1.default.Router();
// POST routes...
jobListingRouter.post(`/`, createJobListing_1.default.validation, createJobListing_1.default.handler);
jobListingRouter.post(`/apply`, verifyAuthenticationHandler_1.default, applyToJobController_1.default.validation, applyToJobController_1.default.handler);
// POST routes...
// PATCH routes...
jobListingRouter.patch(`/`, updateJobListing_1.default.validation, updateJobListing_1.default.handler);
// PATCH routes...
// GET routes...
jobListingRouter.get(`/`, getJobListing_1.default.validation, getJobListing_1.default.handler);
jobListingRouter.get(`/byId`, getJobListingById_1.default.validation, getJobListingById_1.default.handler);
// GET routes...
// DELETE routes...
jobListingRouter.delete(`/`, deleteJobListing_1.default.validation, deleteJobListing_1.default.handler);
// DELETE routes...
exports.default = jobListingRouter;
