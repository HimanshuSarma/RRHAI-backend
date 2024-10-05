import express from 'express';
import jobListingRouter from './jobListingRoutes';
import userRouter from './userRoutes';

const indexRouter = express.Router();

indexRouter.use(
  `/jobListings`,
  jobListingRouter
);

indexRouter.use(
  `/user`,
  userRouter
)


export default indexRouter;