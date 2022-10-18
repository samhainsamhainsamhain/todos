import React, { useContext, useEffect, useState } from 'react';
import { fetchTodoLists } from '../../store/todoLists/ActionCreators';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import TodoListForm from '../forms/TodoListForm';
import TodoListItem from './TodoList';

const TodoListPanel = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { todoLists, isLoading, error } = useAppSelector(
    (state) => state.todoListsSlice
  );

  const [showTodoListForm, setShowTodoListForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTodoLists(user!.id));
  }, []);

  const ShowTodoListFormHandler = () => {
    if (showTodoListForm) {
      return <TodoListForm setShowTodoListForm={setShowTodoListForm} />;
    } else
      return (
        <button onClick={() => setShowTodoListForm(true)}>
          Create new Todo List
        </button>
      );
  };

  return (
    <div>
      <h2>TodoListPage111</h2>
      <div>
        <ShowTodoListFormHandler />
      </div>
      {todoLists.map((todoList) => {
        return (
          <TodoListItem
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

export default TodoListPanel;
