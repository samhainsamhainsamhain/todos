import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteTodoList,
  getTodoListByUserId,
  updateTodoList,
} from '../../api/api';
import {
  DeleteTodoListParams,
  UpdateTodoListParams,
} from '../../types/TodoList';

export const fetchTodoListsThunk = createAsyncThunk(
  'todoLists/fetchAll',
  async (userId: number, thunkAPI) => {
    try {
      const response = await getTodoListByUserId(userId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTodoListThunk = createAsyncThunk(
  'todoLists/updateTodoList',
  async (data: UpdateTodoListParams, thunkAPI) => {
    try {
      const response = await updateTodoList(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodoListThunk = createAsyncThunk(
  'todoLists/deleteTodoList',
  async (data: DeleteTodoListParams, thunkAPI) => {
    try {
      const response = await deleteTodoList(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
