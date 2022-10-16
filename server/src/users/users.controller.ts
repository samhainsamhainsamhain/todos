import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ValidateCreateUserPipe } from './validate-create-user.pipe';
import { UsersService } from './users.service';

@Controller(Routes.USERS)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async fetchUsers() {
    return await this.userService.fetchUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    return this.userService.createUser(userDetails);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
