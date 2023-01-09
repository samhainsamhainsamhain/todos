import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodosThunk } from '../../store/todos/todosThunk';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import TodoForm from '../forms/TodoForm';
import Todo from './Todo';

const TodosPanel = () => {
  const { listid } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lists } = useAppSelector((state) => state.listsSlice);
  const { todos } = useAppSelector((state) => state.todosSlice);

  const list = lists.find((list) => list.id === listid);

  useEffect(() => {
    dispatch(fetchTodosThunk(listid!));
  }, []);

  useEffect(() => {
    if (!list) {
      return navigate('/');
    }
  }, []);

  return (
    <div className="todos">
      <h2 className="todos_title">{list?.title}</h2>
      <TodoForm />
      <ul className="todos_list">
        {todos.map((todo) => {
          return <Todo todo={todo} key={todo.createdAt.toString()} />;
        })}
      </ul>
    </div>
  );
};

export default TodosPanel;
