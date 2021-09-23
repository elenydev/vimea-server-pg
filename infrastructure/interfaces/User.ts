import * as core from 'express-serve-static-core'

export interface UserCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: File;
  policy: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}


export interface GetUserFavouritesQueryParams extends core.ParamsDictionary {
  userId: string;
  pageNumber: string;
  pageSize: string;
}