import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TodoList, TodoListEventPayload } from '../../types/TodoList';
import { fetchTodoListsThunk } from './todoListsThunk';

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
  reducers: {
    editTodoList: (state, action: PayloadAction<TodoListEventPayload>) => {
      const newTodolist = action.payload.todoList;
      const oldTodoList = state.todoLists.find(
        (todoList) => todoList.id === newTodolist.id
      );
      if (!oldTodoList) return;
      const oldTodoListIndex = state.todoLists.findIndex(
        (todoList) => todoList.id === newTodolist.id
      );
      state.todoLists[oldTodoListIndex] = newTodolist;
    },
    removeTodoList: (state, action: PayloadAction<TodoList>) => {
      const newTodolist = action.payload;
      const oldTodoList = state.todoLists.find(
        (todoList) => todoList.id === newTodolist.id
      );
      if (!oldTodoList) return;
      const oldTodoListIndex = state.todoLists.findIndex(
        (todoList) => todoList.id === newTodolist.id
      );
      state.todoLists[oldTodoListIndex] = newTodolist;
    },
  },
  extraReducers: {
    [fetchTodoListsThunk.fulfilled.type]: (
      state,
      action: PayloadAction<TodoList[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.todoLists = action.payload;
    },
    [fetchTodoListsThunk.pending.type]: (
      state,
      action: PayloadAction<TodoList[]>
    ) => {
      state.isLoading = true;
    },
    [fetchTodoListsThunk.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todoListsSlice.reducer;
