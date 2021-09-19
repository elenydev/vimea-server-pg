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
