import { IsNotEmpty } from 'class-validator';

export class UpdateTodoListDto {
  @IsNotEmpty()
  title: string;
}
