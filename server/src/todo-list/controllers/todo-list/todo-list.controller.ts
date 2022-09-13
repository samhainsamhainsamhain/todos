import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoListDto } from 'src/todo-list/dto/todoList/CreateTodoList.dto';
import { TodoListService } from 'src/todo-list/services/todo-list/todo-list.service';

@Controller()
export class TodoListController {
  constructor(private todoListService: TodoListService) {}
  @Get('users/:userId/lists')
  async fetchTodoListsByUserId(@Param('userId') userId: number) {
    const todoLists = await this.todoListService.fetchTodoLists(userId);
    return {
      message: `you are looking todoLists by id: ${userId}`,
      todoLists,
    };
  }

  @Post('users/:userId/lists')
  createTodoList(
    @Param('userId') userId: number,
    @Body() createTodoListDto: CreateTodoListDto,
  ) {
    this.todoListService.createTodoList(userId, createTodoListDto);
    return {
      statusCode: 201,
      message: 'todoList created',
    };
  }

  @Put('users/:userId/lists/:id')
  updateTodoList(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() updateTodoListDto: CreateTodoListDto,
  ) {
    this.todoListService.updateTodoList(userId, id, updateTodoListDto);
    return {
      statusCode: 201,
      message: 'todoList updated',
    };
  }

  @Delete('users/:userId/lists/:id')
  deleteTodoList(@Param('id') id: number) {
    this.todoListService.deleteTodoList(id);
  }
}
