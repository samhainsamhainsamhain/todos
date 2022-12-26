import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchListsThunk } from '../../store/todoLists/todoListsThunk';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import ListForm from '../forms/ListForm';
import ListItem from './ListItem';

const ListPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { todoLists, isLoading, error } = useAppSelector(
    (state) => state.todoListsSlice
  );

  const [showListForm, setShowListForm] = useState(false);

  useEffect(() => {
    if (!user) return navigate('/login');

    dispatch(fetchListsThunk(user.id));
  }, [user]);

  const ShowListFormHandler = () => {
    if (showListForm) {
      return <ListForm setShowListForm={setShowListForm} />;
    } else
      return (
        <button onClick={() => setShowListForm(true)}>Create new List</button>
      );
  };

  return (
    <div className="lists">
      <h2>Todo Lists</h2>
      <div>
        <ShowListFormHandler />
      </div>
      {todoLists.map((todoList) => {
        return (
          <ListItem
            todoListItem={todoList}
            key={todoList.createdAt.toString()}
          />
        );
      })}
      {isLoading && <h3>loading...</h3>}
      {error && <h3>{error}</h3>}
    </div>
  );
};

export default ListPanel;
