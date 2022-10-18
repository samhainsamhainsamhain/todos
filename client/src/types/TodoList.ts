export type TodoList = {
  id: number;
  title: string;
  createdAt: Date;
};

export type CreateTodoListParams = {
  title: string;
};
