import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchListsThunk } from '../../store/lists/listsThunk';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import ListForm from '../forms/ListForm';
import ListItem from './List';

const ListPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { lists, isLoading, error } = useAppSelector(
    (state) => state.listsSlice
  );

  useEffect(() => {
    if (!user) return navigate('/login');

    dispatch(fetchListsThunk(user.id));
  }, [user]);

  return (
    <div className="lists">
      <ListForm />
      {lists.map((list) => {
        return <ListItem list={list} key={list.createdAt.toString()} />;
      })}
      {isLoading && <h3>loading...</h3>}
      {error && <h3>{error}</h3>}
    </div>
  );
};

export default ListPanel;
