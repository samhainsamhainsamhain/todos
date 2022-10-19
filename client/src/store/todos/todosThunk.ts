import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo, getTodosByListId, updateTodo } from '../../api/api';
import { DeleteTodoParams, UpdateTodoParams } from '../../types/TodoItem';

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchAll',
  async (listid: string, thunkAPI) => {
    try {
      const response = await getTodosByListId(listid);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async (data: UpdateTodoParams, thunkAPI) => {
    try {
      const response = await updateTodo(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (data: DeleteTodoParams, thunkAPI) => {
    try {
      const response = await deleteTodo(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
