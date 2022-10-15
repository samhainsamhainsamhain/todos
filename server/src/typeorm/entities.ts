import { Session } from './entities/Session';
import { Todos } from './entities/Todo';
import { TodoList } from './entities/TodoList';
import { User } from './entities/User';

const entities = [User, Session, Todos, TodoList];

export default entities;

export { User, Session, Todos, TodoList };
