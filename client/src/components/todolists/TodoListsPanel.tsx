import React, { useContext, useEffect } from 'react';
import { fetchTodoLists } from '../../store/todoLists/ActionCreators';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';

const TodoListPanel = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { todoLists, isLoading, error } = useAppSelector(
    (state) => state.todoListsSlice
  );

  useEffect(() => {
    dispatch(fetchTodoLists(user!.id));
  }, []);

  return (
    <div>
      <h2>TodoListPage111</h2>
      {todoLists.map((todoList) => {
        return <div>{todoList.title}</div>;
      })}
    </div>
  );
};

export default TodoListPanel;
