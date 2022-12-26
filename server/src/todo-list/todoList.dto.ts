import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateListDto {
  @IsNotEmpty()
  title: string;
}
