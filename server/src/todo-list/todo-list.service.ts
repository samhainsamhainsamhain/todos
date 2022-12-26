import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListDto, UpdateListDto } from 'src/todo-list/todoList.dto';

import { List } from 'src/typeorm/entities/List';
import { User } from 'src/typeorm/entities/User';
import MysqlDataSource from 'src/typeorm/MysqlDataSource';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private todoListsRepository: Repository<List>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async fetchLists(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);

    const todoLists = await this.todoListsRepository
      .createQueryBuilder()
      .where('userId = :id', { id })
      .getMany();

    return todoLists;
  }

  async createList(id: number, createListDetails: CreateListDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);

    const newList = this.todoListsRepository.create({
      ...createListDetails,
      user,
    });

    return await this.todoListsRepository.save(newList);
  }

  async updateList(
    userId: number,
    id: number,
    updateListDetails: UpdateListDto,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const todoList = await this.todoListsRepository.findOneBy({ id });

    if (!user || !todoList)
      throw new HttpException(
        'User or list not found.',
        HttpStatus.BAD_REQUEST,
      );

    return await this.todoListsRepository.update(
      { id },
      { ...updateListDetails },
    );
  }

  async deleteList(id: number, userId: number) {
    return await MysqlDataSource.createQueryBuilder()
      .delete()
      .from('todo_lists')
      .where('userId = :userId', { userId })
      .andWhere('id = :id', { id })
      .execute();
  }
}
