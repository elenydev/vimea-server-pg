export interface UserCreateParams {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: File;
    policy: boolean;
}