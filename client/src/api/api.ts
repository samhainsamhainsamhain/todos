import axios, { AxiosRequestConfig } from 'axios';
import { CreateUserParams, User, UserCredentialsParams } from '../types/User';

const API_URL = 'http://localhost:3001';
// process.env.REACT_APP_API_URL; // TODO get variables from env, currently undefined

const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) =>
  axios.post(`${API_URL}/users`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axios.post<User>(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axios.get<User>(`${API_URL}/auth/status`, config);
