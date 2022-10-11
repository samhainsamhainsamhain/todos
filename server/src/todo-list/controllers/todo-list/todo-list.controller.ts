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
import { CreateTodoListDto } from 'src/todo-list/dto/todoList/CreateTodoList.dto';
import { TodoListService } from 'src/todo-list/services/todo-list/todo-list.service';
import { Routes } from 'src/utils/constants';

@Controller(Routes.LISTS)
export class TodoListController {
  constructor(private todoListService: TodoListService) {}
  @Get()
  async fetchTodoListsByUserId(@Headers('userId') userId: number) {
    const todoLists = await this.todoListService.fetchTodoLists(userId);
    return {
      message: `you are looking todoLists by id: ${userId}`,
      todoLists,
    };
  }

  @Post()
  createTodoList(
    @Headers('userId') userId: number,
    @Body() createTodoListDto: CreateTodoListDto,
  ) {
    this.todoListService.createTodoList(userId, createTodoListDto);
    return {
      statusCode: 201,
      message: 'todoList created',
    };
  }

  @Put(':id')
  updateTodoList(
    @Headers('userId') userId: number,
    @Param('id') id: number,
    @Body() updateTodoListDto: CreateTodoListDto,
  ) {
    this.todoListService.updateTodoList(userId, id, updateTodoListDto);
    return {
      statusCode: 201,
      message: 'todoList updated',
    };
  }

  @Delete(':id')
  deleteTodoList(@Param('id') id: number) {
    this.todoListService.deleteTodoList(id);
  }
}
