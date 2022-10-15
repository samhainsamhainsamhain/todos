import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {}

const initialState: UserState = {};

export const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = todoListsSlice.actions;

export default todoListsSlice.reducer;
