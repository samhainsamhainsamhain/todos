import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { postList } from '../../api/api';
import { fetchListsThunk } from '../../store/lists/listsThunk';
import { CreateListParams } from '../../types/List';
import { AuthContext } from '../../utils/AuthContext';
import { useAppDispatch } from '../../utils/hooks/redux';

const ListForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    resetField,
  } = useForm<CreateListParams>({ mode: 'onChange' });
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  async function createListHandler(data: CreateListParams) {
    try {
      await postList(data.title, user!.id);
      await dispatch(fetchListsThunk(user!.id));
      resetField('title');
    } catch (error) {
      console.error(error); // TODO throw error
    }
  }

  return (
    <div className="ListForm">
      <form onSubmit={handleSubmit(createListHandler)}>
        <input
          className="ListForm_input"
          placeholder="List..."
          {...register('title', { required: true })}
        />
        <button
          className="btn btn_submit ListForm_submit"
          type="submit"
          disabled={!isValid}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ListForm;
