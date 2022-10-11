// export type User
export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type FindOneUserParams = Partial<{
  username: string;
  id: number;
}>;
