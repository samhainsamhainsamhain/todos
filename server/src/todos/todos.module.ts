import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from './controllers/todos/todos.controller';
import { TodosService } from './services/todos/todos.service';

import { Todos } from 'src/typeorm/entities/Todo';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
