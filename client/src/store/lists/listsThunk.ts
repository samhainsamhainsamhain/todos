import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteList, getListByUserId, updateList } from '../../api/api';
import { DeleteListParams, UpdateListParams } from '../../types/List';

export const fetchListsThunk = createAsyncThunk(
  'lists/fetchAll',
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
  'lists/updateList',
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
  'lists/deleteList',
  async (data: DeleteListParams, thunkAPI) => {
    try {
      const response = await deleteList(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
