import { configureStore } from '@reduxjs/toolkit';
import todoListsSlice from './todoLists/todoListsSlice';
import userSlice from './user/userSlice';
import todosSlice from './todos/todosSlice';

export const store = configureStore({
  reducer: { userSlice, todoListsSlice, todosSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type e.g.: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
