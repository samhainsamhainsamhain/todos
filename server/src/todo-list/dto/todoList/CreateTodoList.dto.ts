import { IsNotEmpty } from 'class-validator';

export class CreateTodoListDto {
  @IsNotEmpty()
  title: string;
}
