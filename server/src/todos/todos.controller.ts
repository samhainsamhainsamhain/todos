import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTodoDto } from 'src/todos/todo.dto';
import { TodosService } from 'src/todos/todos.service';
import { Routes } from 'src/utils/constants';

@Controller(Routes.TODOS)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async fetchTodosByListId(@Headers('listid') listId: number) {
    const todos = await this.todosService.fetchTodos(listId);
    return {
      message: `you are looking todos from list ${listId}`,
      todos,
    };
  }

  @Post()
  createTodo(
    @Headers('listid') listId: number,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    this.todosService.createTodo(listId, createTodoDto);
    return {
      statusCode: 201,
      message: 'todo created',
    };
  }

  @Put(':id')
  updateTodo(
    @Headers('listid') listId: number,
    @Param('id') id: number,
    @Body() updateTodoDto: CreateTodoDto,
  ) {
    this.todosService.updateTodoById(listId, id, updateTodoDto);
    return {
      statusCode: 201,
      message: 'todo updated',
    };
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    this.todosService.deleteTodoById(id);
    return {
      statusCode: 201,
      message: 'todo deleted',
    };
  }
}
