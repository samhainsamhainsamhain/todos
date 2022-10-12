import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

import { Todos } from 'src/typeorm/entities/Todo';
import { TodoList } from 'src/typeorm/entities/TodoList';

@Module({
  imports: [TypeOrmModule.forFeature([Todos, TodoList])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
