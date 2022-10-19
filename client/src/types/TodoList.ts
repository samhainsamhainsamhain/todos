export type TodoList = {
  id: string;
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
  id: string;
  title: string;
  userid: string;
};

export type DeleteTodoListParams = {
  id: string;
  userid: string;
};
