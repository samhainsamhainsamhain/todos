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
    const users = await this.userService.fetchUsers();
    return users;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    this.userService.createUser(userDetails);
    return {
      statusCode: 201,
      message: `${userDetails.username} is successfully registered!`,
    };
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
    return {
      statusCode: 201,
      message: `${updateUserDto.username} details is successfully updated!`,
    };
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return {
      statusCode: 200,
      message: `account with ID ${id} is successfully deleted!`,
    };
  }
}