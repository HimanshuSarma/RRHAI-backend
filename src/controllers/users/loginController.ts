import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginValidation } from "../../schemaValidations/userValidations";
import { z } from "zod";
import type { IUserLogin } from "../../types/requestTypes/userRequestTypes";

const loginController = {
  validation: async (req: Request<any, any, IUserLogin>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await loginValidation.parseAsync(req?.body);
      next();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        res?.status(400)?.json({
          errorMessage: err?.issues?.map(issue => {
            console.log(issue, "zodIssue");
            return `${issue?.path} : ${issue?.message}`;
          })?.join("|"),
        })
      } else {
        res?.status(500)?.json({
          errorMessage: err?.message,
        })
      }
    }
  },
  handler: async (req: Request<any, any, IUserLogin>, res: Response, next: NextFunction) => {
    try {
      const fetchedUserWithEmail = await global?.DBModels?.USER?.findOne({
        email: req?.body?.email
      })
      .select("+password")
      .lean();

      if (!fetchedUserWithEmail?._id) {
        throw new Error(`User not found!`);
      }

      const isPasswordMatched = await bcrypt.compare(req?.body?.password, fetchedUserWithEmail?.password);

      if (!isPasswordMatched) {
        throw new Error(`Password is incorrect!`);
      }

      const token = jwt.sign({
        ...fetchedUserWithEmail
      }, String(process.env.JWT_SECRET))

      res?.status(200)?.json({
        message: "Logged inn successfully!",
        payload: {
          user: fetchedUserWithEmail,
          token
        }
      })
    } catch (err: any) {
      res?.status(500)?.json({
        errorMessage: err?.message || "Some error occured!"
      });
    }
  }
};

export default loginController;