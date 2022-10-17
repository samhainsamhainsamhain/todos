import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTodoListByUserId } from '../../api/api';

export const fetchTodoLists = createAsyncThunk(
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
