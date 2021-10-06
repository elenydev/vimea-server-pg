import * as core from 'express-serve-static-core'
import { Movie } from './Movie';

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

export interface GetUserFavouritesQueryParams extends core.ParamsDictionary, UserIdQueryParam {
  pageNumber: string;
  pageSize: string;
}

export interface GetCurrentUserQueryParams extends core.ParamsDictionary { 
  userId: string;
}

export interface PostUserFavouriteMovieBody {
  movie: Movie
}
export interface DeleteUserFavouriteMovieParams extends core.ParamsDictionary, UserIdQueryParam {
  movieId: string;
}

export interface UserIdQueryParam extends core.ParamsDictionary {
  userId: string;
}