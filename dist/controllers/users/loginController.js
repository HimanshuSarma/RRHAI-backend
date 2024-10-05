"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userValidations_1 = require("../../schemaValidations/userValidations");
const zod_1 = require("zod");
const loginController = {
    validation: async (req, res, next) => {
        try {
            await userValidations_1.loginValidation.parseAsync(req?.body);
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
            const fetchedUserWithEmail = await global?.DBModels?.USER?.findOne({
                email: req?.body?.email
            })
                .select("+password")
                .lean();
            if (!fetchedUserWithEmail?._id) {
                throw new Error(`User not found!`);
            }
            const isPasswordMatched = await bcrypt_1.default.compare(req?.body?.password, fetchedUserWithEmail?.password);
            if (!isPasswordMatched) {
                throw new Error(`Password is incorrect!`);
            }
            const token = jsonwebtoken_1.default.sign({
                ...fetchedUserWithEmail
            }, String(process.env.JWT_SECRET));
            res?.status(200)?.json({
                message: "Logged inn successfully!",
                payload: {
                    user: fetchedUserWithEmail,
                    token
                }
            });
        }
        catch (err) {
            res?.status(500)?.json({
                errorMessage: err?.message || "Some error occured!"
            });
        }
    }
};
exports.default = loginController;
