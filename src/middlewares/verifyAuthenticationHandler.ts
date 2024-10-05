import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";

const verifyAuthenticationMiddleware = async (req: Request<any, any, any>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res?.status(400).json({
      errorMessage: "Unauthenticated!"
    });
  } else {
    const tokenPayload = (jwt.verify(token, String(process.env.JWT_SECRET))) as IUser;
    if (tokenPayload) {
      req.user = tokenPayload;
      console.log(tokenPayload?._id, "token")
      next();
    }
  }  
};

export default verifyAuthenticationMiddleware;