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

import { CreateTodoDto, UpdateTodoDto } from 'src/todos/todo.dto';
import { TodosService } from 'src/todos/todos.service';
import { Routes } from 'src/utils/constants';

@Controller(Routes.TODOS)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async fetchTodosByListId(@Headers('listid') listId: number) {
    return await this.todosService.fetchTodos(listId);
  }

  @Post()
  createTodo(
    @Headers('listid') listId: number,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.createTodo(listId, createTodoDto);
  }

  @Put(':id')
  updateTodo(
    @Headers('listid') listId: number,
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateTodoById(listId, id, updateTodoDto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todosService.deleteTodoById(id);
  }
}
