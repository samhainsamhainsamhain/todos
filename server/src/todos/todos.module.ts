import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

import { Todos } from 'src/typeorm/entities/Todo';
import { List } from 'src/typeorm/entities/List';

@Module({
  imports: [TypeOrmModule.forFeature([Todos, List])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
