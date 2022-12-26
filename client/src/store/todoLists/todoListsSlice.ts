import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { List, ListEventPayload } from '../../types/List';
import { fetchListsThunk } from './todoListsThunk';

export interface ListsState {
  todoLists: List[];
  isLoading: boolean;
  error: string;
}

const initialState: ListsState = {
  todoLists: [],
  isLoading: false,
  error: '',
};

export const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    editList: (state, action: PayloadAction<ListEventPayload>) => {
      const newTodolist = action.payload.todoList;
      const oldList = state.todoLists.find(
        (todoList) => todoList.id === newTodolist.id
      );
      if (!oldList) return;
      const oldListIndex = state.todoLists.findIndex(
        (todoList) => todoList.id === newTodolist.id
      );
      state.todoLists[oldListIndex] = newTodolist;
    },
    removeList: (state, action: PayloadAction<List>) => {
      const newTodolist = action.payload;
      const oldList = state.todoLists.find(
        (todoList) => todoList.id === newTodolist.id
      );
      if (!oldList) return;
      const oldListIndex = state.todoLists.findIndex(
        (todoList) => todoList.id === newTodolist.id
      );
      state.todoLists[oldListIndex] = newTodolist;
    },
  },
  extraReducers: {
    [fetchListsThunk.fulfilled.type]: (
      state,
      action: PayloadAction<List[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.todoLists = action.payload;
    },
    [fetchListsThunk.pending.type]: (state, action: PayloadAction<List[]>) => {
      state.isLoading = true;
    },
    [fetchListsThunk.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todoListsSlice.reducer;
