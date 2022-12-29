import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { List, ListEventPayload } from '../../types/List';
import { fetchListsThunk } from './listsThunk';

export interface ListsState {
  lists: List[];
  isLoading: boolean;
  error: string;
}

const initialState: ListsState = {
  lists: [],
  isLoading: false,
  error: '',
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    editList: (state, action: PayloadAction<ListEventPayload>) => {
      const newlist = action.payload.list;
      const oldList = state.lists.find((list) => list.id === newlist.id);
      if (!oldList) return;
      const oldListIndex = state.lists.findIndex(
        (lists) => lists.id === newlist.id
      );
      state.lists[oldListIndex] = newlist;
    },
    removeList: (state, action: PayloadAction<List>) => {
      const newlist = action.payload;
      const oldList = state.lists.find((list) => list.id === newlist.id);
      if (!oldList) return;
      const oldListIndex = state.lists.findIndex(
        (list) => list.id === newlist.id
      );
      state.lists[oldListIndex] = newlist;
    },
  },
  extraReducers: {
    [fetchListsThunk.fulfilled.type]: (
      state,
      action: PayloadAction<List[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.lists = action.payload;
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

export default listsSlice.reducer;
