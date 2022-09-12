import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  fetchUsers() {}

  @Post()
  createUser() {}

  @Patch()
  updateUser() {}

  @Delete()
  deleteUser() {}
}
