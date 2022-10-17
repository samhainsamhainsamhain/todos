import axios, { AxiosRequestConfig } from 'axios';
import { CreateUserParams, User, UserCredentialsParams } from '../types/User';

const API_URL = 'http://localhost:3001';
// process.env.REACT_APP_API_URL; // TODO get variables from env, currently undefined

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) =>
  axiosClient.post(`/users`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const logoutUser = () => axiosClient.post('/auth/logout', {}, config);

export const getTodoListByUserId = (id: number) =>
  axiosClient.get('/lists', { headers: { userid: id } });
