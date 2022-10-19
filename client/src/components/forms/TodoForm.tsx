import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { postTodo } from '../../api/api';
import { fetchTodosThunk } from '../../store/todos/todosThunk';
import { CreateTodoParams } from '../../types/TodoItem';
import { useAppDispatch } from '../../utils/hooks/redux';

interface ITodoForm {
  setShowCreateTodoForm: (state: boolean) => void;
}

const TodoListForm = ({ setShowCreateTodoForm }: ITodoForm) => {
  const { register, handleSubmit, formState } = useForm<CreateTodoParams>();
  const dispatch = useAppDispatch();
  const { id: listid } = useParams();

  async function createTodoListHandler(data: CreateTodoParams) {
    try {
      await postTodo(data, listid!);
      await dispatch(fetchTodosThunk(listid!));
      setShowCreateTodoForm(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Create new Todo List</h2>
      <form onSubmit={handleSubmit(createTodoListHandler)}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title', { required: true })} />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          {...register('description', { required: true })}
        />
        <button type="submit">Create</button>
      </form>
      <button onClick={() => setShowCreateTodoForm(false)}>Cancel</button>
    </div>
  );
};

export default TodoListForm;
