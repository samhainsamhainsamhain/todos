import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
