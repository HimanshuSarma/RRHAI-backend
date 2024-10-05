import express from 'express';
import createJobListingController from '../controllers/joblistings/createJobListing';
import getJobListingController from '../controllers/joblistings/getJobListing';
import updateJobListingController from '../controllers/joblistings/updateJobListing';
import deleteJobListingController from '../controllers/joblistings/deleteJobListing';
import signupController from '../controllers/users/signupController';
import loginController from '../controllers/users/loginController';

const userRouter = express.Router();

// POST routes...
userRouter.post(
  `/signup`,
  signupController.validation,
  signupController.handler
);

userRouter.post(
  `/login`,
  loginController.validation,
  loginController.handler
);
// POST routes...

// PATCH routes...

// PATCH routes...

// GET routes...
userRouter.get(
  `/`,
  getJobListingController.validation,
  getJobListingController.handler
);
// GET routes...

// DELETE routes...
userRouter.delete(
  `/`,
  deleteJobListingController.validation,
  deleteJobListingController.handler
);
// DELETE routes...

export default userRouter;