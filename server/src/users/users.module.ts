import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { TodoListController } from '../todo-list/controllers/todo-list/todo-list.controller';

import { UsersService } from './services/users.service';
import { TodoListService } from '../todo-list/services/todo-list/todo-list.service';

import { TodoList } from 'src/typeorm/entities/TodoList';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User, TodoList])],
  controllers: [UsersController, TodoListController],
  providers: [UsersService, TodoListService],
})
export class UsersModule {}
