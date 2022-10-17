import React, { useContext, useEffect } from 'react';
import { fetchTodoLists } from '../../store/todoLists/ActionCreators';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import TodoListItem from './TodoList';
import TodoList from './TodoList';

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
        return (
          <TodoListItem
            todoListItem={todoList}
            key={todoList.createdAt.toString()}
          />
        );
      })}
    </div>
  );
};

export default TodoListPanel;
