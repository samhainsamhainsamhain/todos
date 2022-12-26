import { Session } from './entities/Session';
import { Todos } from './entities/Todo';
import { List } from './entities/List';
import { User } from './entities/User';

const entities = [User, Session, Todos, List];

export default entities;

export { User, Session, Todos, List };
