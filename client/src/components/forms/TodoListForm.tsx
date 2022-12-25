import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { postTodoList } from '../../api/api';
import { fetchTodoListsThunk } from '../../store/todoLists/todoListsThunk';
import { CreateTodoListParams } from '../../types/TodoList';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch } from '../../utils/hooks/redux';

interface ITodoList {
  setShowTodoListForm: (state: boolean) => void;
}

const TodoListForm = ({ setShowTodoListForm }: ITodoList) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateTodoListParams>();
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  async function createTodoListHandler(data: CreateTodoListParams) {
    try {
      await postTodoList(data.title, user!.id);
      await dispatch(fetchTodoListsThunk(user!.id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="TodoForm">
      <h2>Create new Todo List</h2>
      <form onSubmit={handleSubmit(createTodoListHandler)}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title', { required: true })} />
        <button type="submit" disabled={!isValid}>
          Create
        </button>
      </form>
      <button onClick={() => setShowTodoListForm(false)}>Cancel</button>
    </div>
  );
};

export default TodoListForm;
