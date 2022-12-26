import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { List } from '../../types/List';
import { fetchTodosThunk } from './todosThunk';
import { TodoItem, TodoItemEventPayload } from '../../types/Todo';

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
  reducers: {
    editTodo: (state, action: PayloadAction<TodoItemEventPayload>) => {
      const newTodo = action.payload.todo;
      const oldTodo = state.todos.find((todo) => todo.id === newTodo.id);
      if (!oldTodo) return;
      const oldListIndex = state.todos.findIndex(
        (todo) => todo.id === newTodo.id
      );
      state.todos[oldListIndex] = newTodo;
    },
    removeTodo: (state, action: PayloadAction<TodoItem>) => {
      const newTodo = action.payload;
      const oldTodo = state.todos.find((todo) => todo.id === newTodo.id);
      if (!oldTodo) return;
      const oldTodoIndex = state.todos.findIndex(
        (todo) => todo.id === newTodo.id
      );
      state.todos[oldTodoIndex] = newTodo;
    },
  },
  extraReducers: {
    [fetchTodosThunk.fulfilled.type]: (
      state,
      action: PayloadAction<List[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.todos = action.payload;
    },
    [fetchTodosThunk.pending.type]: (state, action: PayloadAction<List[]>) => {
      state.isLoading = true;
    },
    [fetchTodosThunk.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
