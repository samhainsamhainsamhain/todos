import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { postList } from '../../api/api';
import { fetchListsThunk } from '../../store/todoLists/todoListsThunk';
import { CreateListParams } from '../../types/List';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch } from '../../utils/hooks/redux';

interface IList {
  setShowListForm: (state: boolean) => void;
}

const ListForm = ({ setShowListForm }: IList) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateListParams>();
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  async function createListHandler(data: CreateListParams) {
    try {
      await postList(data.title, user!.id);
      await dispatch(fetchListsThunk(user!.id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="TodoForm">
      <h2>Create new List</h2>
      <form onSubmit={handleSubmit((data) => createListHandler(data))}>
        <input
          placeholder="title"
          {...register('title', { required: true })}
        />
        <button type="submit" disabled={!isValid}>
          Create
        </button>
      </form>
      <button onClick={() => setShowListForm(false)}>Cancel</button>
    </div>
  );
};

export default ListForm;
