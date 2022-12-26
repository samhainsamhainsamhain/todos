import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteList, getListByUserId, updateList } from '../../api/api';
import { DeleteListParams, UpdateListParams } from '../../types/List';

export const fetchListsThunk = createAsyncThunk(
  'todoLists/fetchAll',
  async (userId: string, thunkAPI) => {
    try {
      const response = await getListByUserId(userId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateListThunk = createAsyncThunk(
  'todoLists/updateList',
  async (data: UpdateListParams, thunkAPI) => {
    try {
      const response = await updateList(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteListThunk = createAsyncThunk(
  'todoLists/deleteList',
  async (data: DeleteListParams, thunkAPI) => {
    try {
      const response = await deleteList(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
