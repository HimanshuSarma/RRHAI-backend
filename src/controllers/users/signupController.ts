import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { signupValidation } from "../../schemaValidations/userValidations";
import { z } from "zod";
import { IUserSignup } from "../../types/requestTypes/userRequestTypes";

const signupController = {
  validation: async (req: Request<any, any, IUserSignup>, res: Response<{ errorMessage: string }>, next: NextFunction) => {
    try {
      await signupValidation.parseAsync(req?.body);
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
  handler: async (req: Request<any, any, IUserSignup>, res: Response, next: NextFunction) => {
    try {

      const hashedPass = await bcrypt.hash(req?.body?.password, Number(process.env.SALT_ROUNDS));

      const userSignup = await global?.DBModels?.USER?.create({
        ...req?.body,
        password: hashedPass,
        userRole: "client"
      });
      if (userSignup?._id) {
        res?.status(200)?.json({
          message: "Signup successful!",
          payload: userSignup
        })
      } else {
        res?.status(500)?.json({
          errorMessage: "Some error occured!"
        })
      }
    } catch (err: any) {
      console.log(err, "error!")
      res?.status(500)?.json({
        errorMessage: err?.code === 11000 ? "User already exists" : (err?.message || "Some error occured!")
      });
    }
  }
};

export default signupController;