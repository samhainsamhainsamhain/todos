export type User = {
  id: number;
  username: string;
};

export type CreateUserParams = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};
