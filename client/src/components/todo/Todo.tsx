import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from '../../store/todos/todosThunk';
import { TodoItem } from '../../types/TodoItem';
import { useAppDispatch } from '../../utils/hooks/redux';

interface ITodo {
  todo: TodoItem;
}

const Todo = ({ todo }: ITodo) => {
  const { id: listid } = useParams();
  const dispatch = useAppDispatch();
  const { id, title, description, createdAt } = todo;
  const [showUpdateTodoForm, setShowUpdateTodoForm] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoDescription, setTodoDescription] = useState(todo.description);

  const deleteTodoHandler = async () => {
    await dispatch(deleteTodoThunk({ id, listid: listid! }));
    dispatch(fetchTodosThunk(listid!));
  };

  const updateTodoHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(id, todoTitle, todoDescription, listid!);

    await dispatch(
      updateTodoThunk({
        id,
        title: todoTitle,
        description: todoDescription,
        listid: listid!,
      })
    );
    dispatch(fetchTodosThunk(listid!));
    setShowUpdateTodoForm(false);
  };

  const updateTodoForm = () => {
    return (
      <form onSubmit={updateTodoHandler}>
        <input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.currentTarget.value)}
        />
        <input
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.currentTarget.value)}
        />
        <button type="submit">Save</button>
      </form>
    );
  };

  const todoComponent = () => {
    return (
      <>
        <h4>{title}</h4>
        <p>
          <span>{description}</span>
          <button onClick={() => setShowUpdateTodoForm(true)}>Edit Todo</button>
          <button onClick={deleteTodoHandler}>Delete Todo</button>
        </p>
      </>
    );
  };

  return <div>{showUpdateTodoForm ? updateTodoForm() : todoComponent()}</div>;
};

export default Todo;
