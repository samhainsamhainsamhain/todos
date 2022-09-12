import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoList } from './TodoList';

@Entity({
  name: 'todos',
})
export class Todos {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos)
  todoList: TodoList;
}
