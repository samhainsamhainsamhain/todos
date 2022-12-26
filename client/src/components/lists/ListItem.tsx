import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from '../../types/List';
import { useAppDispatch } from '../../utils/hooks/redux';
import {
  deleteListThunk,
  fetchListsThunk,
  updateListThunk,
} from '../../store/todoLists/todoListsThunk';
import { AuthContext } from '../../utils/AuthContext';

interface IList {
  todoListItem: List;
}

const ListItem = ({ todoListItem }: IList) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const { id, title, createdAt } = todoListItem;
  const date = new Date(createdAt);
  const [todoListTitle, setListTitle] = useState(todoListItem.title);
  const [showUpdateListForm, setShowUpdateListForm] = useState(false);

  const deleteListHandler = async () => {
    await dispatch(deleteListThunk({ id, userid: user!.id }));
    dispatch(fetchListsThunk(user!.id));
  };

  const updateListHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(
      updateListThunk({ id, title: todoListTitle, userid: user!.id })
    );
    dispatch(fetchListsThunk(user!.id));
    setShowUpdateListForm(false);
  };

  const updateListForm = () => {
    return (
      <form onSubmit={updateListHandler}>
        <input
          value={todoListTitle}
          onChange={(e) => setListTitle(e.currentTarget.value)}
        />
        <button type="submit">Save</button>
      </form>
    );
  };

  return (
    <div>
      {!showUpdateListForm ? (
        <h3 onClick={() => navigate(`/lists/${id}`)}>{title}</h3>
      ) : (
        updateListForm()
      )}

      <p>Created: {date.toDateString()}</p>
      <button onClick={() => setShowUpdateListForm(true)}>Edit List</button>
      <button onClick={deleteListHandler}>Delete List</button>
    </div>
  );
};

export default ListItem;
