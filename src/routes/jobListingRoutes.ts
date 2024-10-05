import express from 'express';
import createJobListingController from '../controllers/joblistings/createJobListing';
import getJobListingController from '../controllers/joblistings/getJobListing';
import updateJobListingController from '../controllers/joblistings/updateJobListing';
import deleteJobListingController from '../controllers/joblistings/deleteJobListing';
import getJobListingByIdController from '../controllers/joblistings/getJobListingById';
import verifyAuthenticationMiddleware from '../middlewares/verifyAuthenticationHandler';
import applyToJobController from '../controllers/joblistings/applyToJobController';

const jobListingRouter = express.Router();

// POST routes...
jobListingRouter.post(
  `/`,
  createJobListingController.validation,
  createJobListingController.handler
);

jobListingRouter.post(
  `/apply`,
  verifyAuthenticationMiddleware,
  applyToJobController.validation,
  applyToJobController.handler
);
// POST routes...

// PATCH routes...
jobListingRouter.patch(
  `/`,
  updateJobListingController.validation,
  updateJobListingController.handler
);
// PATCH routes...

// GET routes...
jobListingRouter.get(
  `/`,
  getJobListingController.validation,
  getJobListingController.handler
);

jobListingRouter.get(
  `/byId`,
  getJobListingByIdController.validation,
  getJobListingByIdController.handler
);
// GET routes...

// DELETE routes...
jobListingRouter.delete(
  `/`,
  deleteJobListingController.validation,
  deleteJobListingController.handler
);
// DELETE routes...

export default jobListingRouter;