"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    jobApplications: (Array),
    userRole: { type: String, enum: ["admin", "client"], required: true }
}, {
    timestamps: true
});
exports.default = UserSchema;
