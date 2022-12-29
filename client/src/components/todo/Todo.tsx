import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from '../../store/todos/todosThunk';
import { TodoItem } from '../../types/Todo';
import { useAppDispatch } from '../../utils/hooks/redux';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as RemoveIcon } from '../../assets/trash-can.svg';

interface ITodo {
  todo: TodoItem;
}

const Todo = ({ todo }: ITodo) => {
  const { id: listid } = useParams();
  const dispatch = useAppDispatch();
  const { id, title, description, createdAt } = todo;
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoDescription, setTodoDescription] = useState(todo.description);
  const [todoIsEditable, setTodoIsEditable] = useState(false);
  const todoRef = useRef<HTMLDivElement>(null);
  const todoTitleRef = useRef<HTMLTextAreaElement>(null);
  const todoDescriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    todoRef.current?.focus();
  }, [setTodoIsEditable]);

  const deleteTodoHandler = async () => {
    await dispatch(deleteTodoThunk({ id, listid: listid! }));
    dispatch(fetchTodosThunk(listid!));
  };

  const updateTodoHandler = async () => {
    setTodoIsEditable(false);
    if (todoTitle === title && todoDescription === description) return;

    await dispatch(
      updateTodoThunk({
        id,
        title: todoTitle,
        description: todoDescription,
        listid: listid!,
      })
    );

    dispatch(fetchTodosThunk(listid!));
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    updateTodoHandler();
  };

  const resizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (e.currentTarget.scrollHeight > target.clientHeight) {
      e.currentTarget.style.height = `${target.scrollHeight + 8}px`;
    }
  };

  return (
    <div
      className="todo"
      ref={todoRef}
      onBlur={(e) => {
        handleBlur(e);
      }}
    >
      <textarea
        className={
          'todo_title textarea' + ' ' + (todoIsEditable ? 'editable' : '')
        }
        ref={todoTitleRef}
        value={todoTitle}
        spellCheck={false}
        onChange={(e) => {
          resizeTextarea(e);
          setTodoTitle(e.currentTarget.value);
        }}
        disabled={!todoIsEditable}
      />
      <textarea
        className={
          'todo_description textarea' + ' ' + (todoIsEditable ? 'editable' : '')
        }
        ref={todoDescriptionRef}
        value={todoDescription}
        spellCheck={false}
        onChange={(e) => {
          resizeTextarea(e);
          setTodoDescription(e.currentTarget.value);
        }}
        disabled={!todoIsEditable}
      />
      <div className="todo_controls">
        <button
          className="btn btn_secondary btn_edit"
          onClick={() => {
            setTodoIsEditable(true);
          }}
        >
          <EditIcon />
        </button>
        <button
          className="btn btn_secondary btn_remove"
          onClick={deleteTodoHandler}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default Todo;
