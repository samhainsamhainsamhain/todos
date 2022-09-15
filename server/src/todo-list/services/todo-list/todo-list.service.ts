import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoListDto } from 'src/todo-list/dto/todoList/CreateTodoList.dto';
import { UpdateTodoListDto } from 'src/todo-list/dto/todoList/UpdateTodoList.dto';
import { TodoList } from 'src/typeorm/entities/TodoList';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoListsRepository: Repository<TodoList>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async fetchTodoLists(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);

    const todoLists = await this.todoListsRepository
      .createQueryBuilder()
      .where('userId = :id', { id })
      .getMany();

    return todoLists;
  }

  async createTodoList(id: number, createTodoListDetails: CreateTodoListDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);

    const newTodoList = this.todoListsRepository.create({
      ...createTodoListDetails,
      user,
    });

    return await this.todoListsRepository.save(newTodoList);
  }

  async updateTodoList(
    userId: number,
    id: number,
    updateTodoListDetails: UpdateTodoListDto,
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
      { ...updateTodoListDetails },
    );
  }

  async deleteTodoList(id: number) {
    return await this.todoListsRepository.delete({ id });
  }
}
