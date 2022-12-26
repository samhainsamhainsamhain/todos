import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListController } from './todo-list.controller';
import { ListService } from './todo-list.service';

import { List } from 'src/typeorm/entities/List';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([List, User])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
