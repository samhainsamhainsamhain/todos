import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TodoList } from '../../types/TodoList';
import { fetchTodoLists } from './ActionCreators';

export interface TodoListsState {
  todoLists: TodoList[];
  isLoading: boolean;
  error: string;
}

const initialState: TodoListsState = {
  todoLists: [],
  isLoading: false,
  error: '',
};

export const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodoLists.fulfilled.type]: (
      state,
      action: PayloadAction<TodoList[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.todoLists = action.payload;
    },
    [fetchTodoLists.pending.type]: (
      state,
      action: PayloadAction<TodoList[]>
    ) => {
      state.isLoading = true;
    },
    [fetchTodoLists.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todoListsSlice.reducer;
