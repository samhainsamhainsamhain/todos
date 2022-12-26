import axios, { AxiosRequestConfig } from 'axios';
import {
  CreateTodoParams,
  DeleteTodoParams,
  UpdateTodoParams,
} from '../types/Todo';
import { DeleteListParams, UpdateListParams } from '../types/List';
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

export const getListByUserId = (id: string) =>
  axiosClient.get('/lists', { headers: { userid: id } });

export const postList = (title: string, userid: string) =>
  axiosClient.post(`/lists`, { title }, { ...config, headers: { userid } });

export const updateList = (data: UpdateListParams) => {
  const { id, title, userid } = data;
  return axiosClient.put(
    `/lists/${id}`,
    { title },
    { ...config, headers: { userid } }
  );
};

export const deleteList = (data: DeleteListParams) => {
  const { id, userid } = data;
  return axiosClient.delete(`/lists/${id}`, { ...config, headers: { userid } });
};

export const getTodosByListId = (id: string) =>
  axiosClient.get('/todos', { headers: { listid: id } });

export const postTodo = (data: CreateTodoParams, listid: string) =>
  axiosClient.post(`/todos`, data, { ...config, headers: { listid } });

export const updateTodo = (data: UpdateTodoParams) => {
  const { id, title, listid, description } = data;
  return axiosClient.put(
    `/todos/${id}`,
    { title, description },
    { ...config, headers: { listid } }
  );
};

export const deleteTodo = (data: DeleteTodoParams) => {
  const { id, listid } = data;
  return axiosClient.delete(`/todos/${id}`, { ...config, headers: { listid } });
};
