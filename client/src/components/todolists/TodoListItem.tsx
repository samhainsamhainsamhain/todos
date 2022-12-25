import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '../../types/TodoList';
import { useAppDispatch } from '../../utils/hooks/redux';
import {
  deleteTodoListThunk,
  fetchTodoListsThunk,
  updateTodoListThunk,
} from '../../store/todoLists/todoListsThunk';
import { AuthContext } from '../../utils/AuthContext';

interface ITodoList {
  todoListItem: TodoList;
}

const TodoListItem = ({ todoListItem }: ITodoList) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const { id, title, createdAt } = todoListItem;
  const date = new Date(createdAt);
  const [todoListTitle, setTodoListTitle] = useState(todoListItem.title);
  const [showUpdateTodoListForm, setShowUpdateTodoListForm] = useState(false);

  const deleteTodoListHandler = async () => {
    await dispatch(deleteTodoListThunk({ id, userid: user!.id }));
    dispatch(fetchTodoListsThunk(user!.id));
  };

  const updateTodoListHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(
      updateTodoListThunk({ id, title: todoListTitle, userid: user!.id })
    );
    dispatch(fetchTodoListsThunk(user!.id));
    setShowUpdateTodoListForm(false);
  };

  const updateTodoListForm = () => {
    return (
      <form onSubmit={updateTodoListHandler}>
        <input
          value={todoListTitle}
          onChange={(e) => setTodoListTitle(e.currentTarget.value)}
        />
        <button type="submit">Save</button>
      </form>
    );
  };

  return (
    <div>
      {!showUpdateTodoListForm ? (
        <h3 onClick={() => navigate(`/lists/${id}`)}>{title}</h3>
      ) : (
        updateTodoListForm()
      )}

      <p>Created: {date.toDateString()}</p>
      <button onClick={() => setShowUpdateTodoListForm(true)}>
        Edit Todo List
      </button>
      <button onClick={deleteTodoListHandler}>Delete Todo List</button>
    </div>
  );
};

export default TodoListItem;
