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
import { CreateTodoListDto } from 'src/todo-list/todoList.dto';
import { TodoListService } from 'src/todo-list/todo-list.service';
import { Routes } from 'src/utils/constants';

@Controller(Routes.LISTS)
export class TodoListController {
  constructor(private todoListService: TodoListService) {}
  @Get()
  async fetchTodoListsByUserId(@Headers('userid') userId: number) {
    return await this.todoListService.fetchTodoLists(userId);
  }

  @Post()
  createTodoList(
    @Headers('userid') userId: number,
    @Body() createTodoListDto: CreateTodoListDto,
  ) {
    return this.todoListService.createTodoList(userId, createTodoListDto);
  }

  @Put(':id')
  async updateTodoList(
    @Headers('userid') userId: number,
    @Param('id') id: number,
    @Body() updateTodoListDto: CreateTodoListDto,
  ) {
    await this.todoListService.updateTodoList(userId, id, updateTodoListDto);
    return updateTodoListDto;
  }

  @Delete(':id')
  deleteTodoList(@Headers('userid') userId: number, @Param('id') id: number) {
    return this.todoListService.deleteTodoList(id, userId);
  }
}
