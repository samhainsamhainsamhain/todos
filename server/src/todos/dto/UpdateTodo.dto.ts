import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;

  description: string;
}
