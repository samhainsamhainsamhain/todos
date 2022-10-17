import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '../../types/TodoList';

interface ITodoList {
  todoListItem: TodoList;
}

const TodoListItem = ({ todoListItem }: ITodoList) => {
  const navigate = useNavigate();
  const { id, title, createdAt } = todoListItem;
  const date = new Date(createdAt);

  return (
    <div>
      <h3>{title}</h3>
      <p>Created: {date.toDateString()}</p>
      <button
        onClick={() => {
          navigate(`/lists/${id}`);
        }}
      >
        Add new Todo
      </button>
    </div>
  );
};

export default TodoListItem;
