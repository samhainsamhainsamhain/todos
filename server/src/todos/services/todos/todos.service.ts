import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from 'src/todos/dto/CreateTodo.dto';
import { UpdateTodoDto } from 'src/todos/dto/UpdateTodo.dto';

import { Todos } from 'src/typeorm/entities/Todo';
import { TodoList } from 'src/typeorm/entities/TodoList';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,

    @InjectRepository(TodoList)
    private todoListsRepository: Repository<TodoList>,
  ) {}

  async fetchTodos(id: number) {
    const todos = await this.todosRepository
      .createQueryBuilder()
      .where('todoListId = :id', { id })
      .getMany();

    return todos;
  }

  async createTodo(listId: number, createTodoDetails: CreateTodoDto) {
    const todoList = await this.todoListsRepository.findOneBy({ id: listId });

    if (!todoList) {
      throw new HttpException('Todo List not found.', HttpStatus.BAD_REQUEST);
    }

    const newTodo = this.todosRepository.create({
      ...createTodoDetails,
      todoList,
    });

    return await this.todosRepository.save(newTodo);
  }

  async updateTodoById(
    listId: number,
    id: number,
    updateTodoDetails: UpdateTodoDto,
  ) {
    const todoList = await this.todoListsRepository.findOneBy({ id: listId });
    const todo = await this.todosRepository.findOneBy({ id });

    if (!todoList || !todo)
      throw new HttpException(
        'List or todo not found.',
        HttpStatus.BAD_REQUEST,
      );

    return await this.todosRepository.update({ id }, { ...updateTodoDetails });
  }

  async deleteTodoById(id) {
    return await this.todosRepository.delete({ id });
  }
}
