import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  FindOneUserParams,
  UpdateUserParams,
} from 'src/utils/types/users/types';
import { DeleteResult } from 'typeorm';

export interface IUserService {
  fetchUsers(): Promise<User[]>;

  findOneUser(userDetails: FindOneUserParams): Promise<User>;

  createUser(userDetails: CreateUserParams): Promise<User>;

  updateUser(id: number, userDetails: UpdateUserParams): Promise<any>; // define return type

  deleteUser(id: number): Promise<DeleteResult>;
}
