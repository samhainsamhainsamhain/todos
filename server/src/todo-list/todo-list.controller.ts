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
import { CreateListDto } from 'src/todo-list/todoList.dto';
import { ListService } from 'src/todo-list/todo-list.service';
import { Routes } from 'src/utils/constants';

@Controller(Routes.LISTS)
export class ListController {
  constructor(private todoListService: ListService) {}
  @Get()
  async fetchListsByUserId(@Headers('userid') userId: number) {
    return await this.todoListService.fetchLists(userId);
  }

  @Post()
  createList(
    @Headers('userid') userId: number,
    @Body() createListDto: CreateListDto,
  ) {
    return this.todoListService.createList(userId, createListDto);
  }

  @Put(':id')
  async updateList(
    @Headers('userid') userId: number,
    @Param('id') id: number,
    @Body() updateListDto: CreateListDto,
  ) {
    await this.todoListService.updateList(userId, id, updateListDto);
    return updateListDto;
  }

  @Delete(':id')
  deleteList(@Headers('userid') userId: number, @Param('id') id: number) {
    return this.todoListService.deleteList(id, userId);
  }
}
