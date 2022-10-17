import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTodosByListId } from '../../api/api';

export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async (listId: number, thunkAPI) => {
    try {
      const response = await getTodosByListId(listId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
