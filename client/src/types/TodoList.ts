export type TodoList = {
  id: number;
  title: string;
  createdAt: Date;
};

export type CreateTodoListParams = {
  title: string;
};

export type TodoListEventPayload = {
  todoList: TodoList;
};

export type UpdateTodoListParams = {
  id: number;
  title: string;
  userid: number;
};

export type DeleteTodoListParams = {
  id: number;
  userid: number;
};
