import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TodoList } from '../../types/TodoList';
import { fetchTodos } from './ActionCreators';
import { TodoItem } from '../../types/TodoItem';

export interface TodosState {
  todos: TodoItem[];
  isLoading: boolean;
  error: string;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled.type]: (state, action: PayloadAction<TodoList[]>) => {
      state.isLoading = false;
      state.error = '';
      state.todos = action.payload;
    },
    [fetchTodos.pending.type]: (state, action: PayloadAction<TodoList[]>) => {
      state.isLoading = true;
    },
    [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
