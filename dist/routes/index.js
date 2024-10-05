"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobListingRoutes_1 = __importDefault(require("./jobListingRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const indexRouter = express_1.default.Router();
indexRouter.use(`/jobListings`, jobListingRoutes_1.default);
indexRouter.use(`/user`, userRoutes_1.default);
exports.default = indexRouter;
