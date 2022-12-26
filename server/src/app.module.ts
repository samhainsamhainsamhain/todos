import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { ListModule } from './todo-list/todo-list.module';
import { TodosModule } from './todos/todos.module';

import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

import entities from './typeorm/entities';
import MysqlDataSource from './typeorm/MysqlDataSource';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ListModule,
    TodosModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      ...MysqlDataSource.options,
      entities,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
