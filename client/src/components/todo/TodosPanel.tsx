import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodosThunk } from '../../store/todos/todosThunk';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import Todo from './Todo';

const TodosPanel = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { todoLists } = useAppSelector((state) => state.todoListsSlice);
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.todosSlice
  );

  const todoList = todoLists.find((tl) => tl.id === id);

  useEffect(() => {
    dispatch(fetchTodosThunk(id!));
  }, []);

  useEffect(() => {
    if (!todoList) {
      return navigate('/');
    }
  }, []);

  return (
    <div>
      <h2>{todoList?.title}</h2>
      {todos.map((todo) => {
        return <Todo todo={todo} key={todo.createdAt.toString()} />;
      })}
    </div>
  );
};

export default TodosPanel;
