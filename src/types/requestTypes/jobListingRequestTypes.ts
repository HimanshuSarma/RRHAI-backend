interface ICreateJobListingRequestBody {
  title: string,
  description: string,
  requirements: Array<string>,
  salary: number,
  location: string
};

interface IUpdateJobListingRequestBody {
  title?: string,
  description?: string,
  requirements?: Array<string>,
  salary?: number,
  location?: string
};

interface IUpdateJobListingRequestQueryParams {
  _id: string
};

interface IGetJobListingRequestQueryParams {
  _id?: string,
  name?: string
};

interface IGetJobListingByIdRequestQueryParams {
  _id?: string,
};

interface IDeleteJobListingRequestQueryParams {
  _id: string
};

interface IApplyToJobRequestBody {
  _id: string,
  description?: string
};


export type {
  ICreateJobListingRequestBody,
  IUpdateJobListingRequestBody,
  IUpdateJobListingRequestQueryParams,
  IGetJobListingRequestQueryParams,
  IDeleteJobListingRequestQueryParams,
  IGetJobListingByIdRequestQueryParams,
  IApplyToJobRequestBody
}