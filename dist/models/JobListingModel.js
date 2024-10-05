"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const JobApplicationSchema = new mongoose_1.default.Schema({
    applicantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "users", required: true },
    description: { type: String, default: "" }
});
const JobListingSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: (Array),
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    applications: [JobApplicationSchema]
}, {
    timestamps: true
});
exports.default = JobListingSchema;
