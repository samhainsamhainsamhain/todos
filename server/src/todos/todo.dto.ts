import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;
}
