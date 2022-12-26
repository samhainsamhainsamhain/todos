export type List = {
  id: string;
  title: string;
  createdAt: Date;
};

export type CreateListParams = {
  title: string;
};

export type ListEventPayload = {
  todoList: List;
};

export type UpdateListParams = {
  id: string;
  title: string;
  userid: string;
};

export type DeleteListParams = {
  id: string;
  userid: string;
};
