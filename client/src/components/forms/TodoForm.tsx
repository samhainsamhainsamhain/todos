import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { postTodo } from '../../api/api';
import { fetchTodosThunk } from '../../store/todos/todosThunk';
import { CreateTodoParams } from '../../types/Todo';
import { useAppDispatch } from '../../utils/hooks/redux';

interface ITodoForm {}

const TodoItemForm = ({}: ITodoForm) => {
  const [formInFocus, setFormInFocus] = useState(false);
  const { register, handleSubmit, formState, resetField } =
    useForm<CreateTodoParams>();
  const dispatch = useAppDispatch();
  const { id: listid } = useParams();
  const todoFormRef = useRef<HTMLDivElement>(null);

  async function createTodoHandler(data: CreateTodoParams) {
    console.log('hiii');
    try {
      await postTodo(data, listid!);
      await dispatch(fetchTodosThunk(listid!));
      resetField('title');
      resetField('description');
    } catch (error) {
      console.error(error);
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLFormElement, Element>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    setFormInFocus(false);
    handleSubmit(createTodoHandler)();
  };

  return (
    <div ref={todoFormRef}>
      <form
        className="TodoForm"
        onBlur={(e) => {
          handleBlur(e);
        }}
      >
        <input
          className={`TodoForm_input ${!formInFocus ? 'hidden' : 'shown'}`}
          id="title"
          placeholder="Title..."
          onFocus={() => setFormInFocus(true)}
          {...register('title', { required: true })}
        />
        <input
          className={`TodoForm_input ${!formInFocus ? 'hidden' : 'shown'}`}
          id="description"
          placeholder="Description..."
          {...register('description', { required: false })}
        />
      </form>
    </div>
  );
};

export default TodoItemForm;
