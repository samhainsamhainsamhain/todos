export type TList = {
  id: string;
  title: string;
  createdAt: Date;
};

export type CreateListParams = {
  title: string;
};

export type ListEventPayload = {
  list: TList;
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
