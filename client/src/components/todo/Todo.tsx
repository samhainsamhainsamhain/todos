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
import Textarea from '../ui/Textarea';

type ITodo = {
  todo: TodoItem;
};

type Params = {
  listid: string;
};

const Todo = ({ todo }: ITodo) => {
  const { listid } = useParams<keyof Params>() as Params; // this workaround is necessary because of react-router's useParams hook typings
  const dispatch = useAppDispatch();
  const { id, title, description } = todo;
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoDescription, setTodoDescription] = useState(todo.description);
  const [todoIsReadOnly, setTodoIsReadOnly] = useState(true);
  const todoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    todoRef.current?.focus();
  }, [setTodoIsReadOnly]);

  const deleteTodoHandler = async () => {
    await dispatch(deleteTodoThunk({ id, listid: listid! }));
    dispatch(fetchTodosThunk(listid));
  };

  const updateTodoHandler = async () => {
    setTodoIsReadOnly(true);
    if (todoTitle === title && todoDescription === description) return;

    await dispatch(
      updateTodoThunk({
        id,
        title: todoTitle,
        description: todoDescription,
        listid,
      })
    );

    dispatch(fetchTodosThunk(listid!));
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    updateTodoHandler();
  };

  return (
    <div className="todo" ref={todoRef} onBlur={handleBlur}>
      <Textarea
        className={'todo_title'}
        placeholder={'Title...'}
        value={todoTitle}
        onChange={setTodoTitle}
        isReadOnly={todoIsReadOnly}
      />
      <Textarea
        className={'todo_description'}
        placeholder={'Description...'}
        value={todoDescription}
        onChange={setTodoDescription}
        isReadOnly={todoIsReadOnly}
      />
      <div className="todo_controls">
        <button
          className="btn btn_secondary btn_edit"
          onClick={() => {
            setTodoIsReadOnly(false);
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
