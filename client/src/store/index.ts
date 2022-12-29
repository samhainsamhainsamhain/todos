import { configureStore } from '@reduxjs/toolkit';
import listsSlice from './lists/listsSlice';
import userSlice from './user/userSlice';
import todosSlice from './todos/todosSlice';

export const store = configureStore({
  reducer: { userSlice, listsSlice, todosSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type e.g.: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
