"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobListingModel_1 = __importDefault(require("../models/JobListingModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const createConnectionHandler = async () => {
    try {
        const conn = mongoose_1.default.createConnection(process.env.MONGO_URI);
        conn.on("connected", () => {
            console.log("Db connected");
            const dbModels = {
                JOB_LISTING: conn.model("job_listing", JobListingModel_1.default),
                USER: conn.model("users", UserModel_1.default)
            };
            global.DBModels = dbModels;
        });
        conn.on("error", () => {
            console.log("Some error occured in connecting to the DB. Exiting");
            process.exit(0);
        });
    }
    catch (err) {
        console.error(err, "DB connection error!");
    }
};
exports.default = createConnectionHandler;
