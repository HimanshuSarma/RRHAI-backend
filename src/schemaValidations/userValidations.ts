import z from "zod";

const signupValidation = z.object({
  email: z.string(),
  password: z.string()
});

const loginValidation = z.object({
  email: z.string(),
  password: z.string()
});

export {
  signupValidation,
  loginValidation
};