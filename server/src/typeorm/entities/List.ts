import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todos } from './Todo';
import { User } from './User';

@Entity({
  name: 'todo_lists',
})
export class List {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'longtext' })
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.todoLists, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Todos, (todos) => todos.todoList)
  todos: Todos[];
}
