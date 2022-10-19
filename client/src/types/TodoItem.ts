export type TodoItem = {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
};

export type CreateTodoParams = {
  title: string;
  description?: string;
};

export type TodoItemEventPayload = {
  todo: TodoItem;
};

export type UpdateTodoParams = {
  id: string;
  title: string;
  description: string | undefined | null;
  listid: string;
};

export type DeleteTodoParams = {
  id: string;
  listid: string;
};
