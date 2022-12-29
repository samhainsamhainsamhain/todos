import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodosThunk } from '../../store/todos/todosThunk';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import TodoForm from '../forms/TodoForm';
import Todo from './Todo';

const TodosPanel = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showCreateTodoForm, setShowCreateTodoForm] = useState(false);
  const { lists } = useAppSelector((state) => state.listsSlice);
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.todosSlice
  );

  const list = lists.find((l) => l.id === id);

  useEffect(() => {
    dispatch(fetchTodosThunk(id!));
  }, []);

  useEffect(() => {
    if (!list) {
      return navigate('/');
    }
  }, []);

  const ShowTodoFormHandler = () => {
    if (showCreateTodoForm) {
      return <TodoForm setShowCreateTodoForm={setShowCreateTodoForm} />;
    } else
      return (
        <button onClick={() => setShowCreateTodoForm(true)}>
          Create new Todo
        </button>
      );
  };

  return (
    <div className="todos">
      <h2 className="todos_title">{list?.title}</h2>
      {ShowTodoFormHandler()}
      <ul className="todos_list">
        {todos.map((todo) => {
          return <Todo todo={todo} key={todo.createdAt.toString()} />;
        })}
      </ul>
    </div>
  );
};

export default TodosPanel;
