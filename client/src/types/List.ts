export type ListType = {
  id: string;
  title: string;
  createdAt: Date;
};

export type CreateListParams = {
  title: string;
};

export type ListEventPayload = {
  list: ListType;
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
