import axios, { AxiosRequestConfig } from 'axios';
import { CreateTodoParams } from '../types/TodoItem';
import { DeleteTodoListParams, UpdateTodoListParams } from '../types/TodoList';
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

export const postTodoList = (title: string, userid: number) =>
  axiosClient.post(`/lists`, { title }, { ...config, headers: { userid } });

export const updateTodoList = (data: UpdateTodoListParams) => {
  const { id, title, userid } = data;
  return axiosClient.put(
    `/lists/${id}`,
    { title },
    { ...config, headers: { userid } }
  );
};

export const deleteTodoList = (data: DeleteTodoListParams) => {
  const { id, userid } = data;
  return axiosClient.delete(`/lists/${id}`, { ...config, headers: { userid } });
};

export const getTodosByListId = (id: number) =>
  axiosClient.get('/todos', { headers: { listid: id } });

export const postTodo = (data: CreateTodoParams, listid: number) =>
  axiosClient.post(`/todos`, data, { ...config, headers: { listid } });
