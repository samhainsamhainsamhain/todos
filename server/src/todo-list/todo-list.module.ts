import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoListController } from './controllers/todo-list/todo-list.controller';
import { TodoListService } from './services/todo-list/todo-list.service';

import { TodoList } from 'src/typeorm/entities/TodoList';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, User])],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
