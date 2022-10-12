import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  description: string;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;

  description: string;
}
