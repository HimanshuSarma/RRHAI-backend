"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthenticationMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res?.status(400).json({
            errorMessage: "Unauthenticated!"
        });
    }
    else {
        const tokenPayload = (jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET)));
        if (tokenPayload) {
            req.user = tokenPayload;
            console.log(tokenPayload?._id, "token");
            next();
        }
    }
};
exports.default = verifyAuthenticationMiddleware;
