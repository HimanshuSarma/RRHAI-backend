"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidations_1 = require("../../schemaValidations/userValidations");
const zod_1 = require("zod");
const signupController = {
    validation: async (req, res, next) => {
        try {
            await userValidations_1.signupValidation.parseAsync(req?.body);
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
            const hashedPass = await bcrypt_1.default.hash(req?.body?.password, Number(process.env.SALT_ROUNDS));
            const userSignup = await global?.DBModels?.USER?.create({
                ...req?.body,
                password: hashedPass,
                userRole: "client"
            });
            if (userSignup?._id) {
                res?.status(200)?.json({
                    message: "Signup successful!",
                    payload: userSignup
                });
            }
            else {
                res?.status(500)?.json({
                    errorMessage: "Some error occured!"
                });
            }
        }
        catch (err) {
            console.log(err, "error!");
            res?.status(500)?.json({
                errorMessage: err?.code === 11000 ? "User already exists" : (err?.message || "Some error occured!")
            });
        }
    }
};
exports.default = signupController;
