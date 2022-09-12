import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.confirmPassword !== value.password)
      throw new HttpException(
        `Confirmation Password doesn't match Password`,
        HttpStatus.FORBIDDEN,
      );

    return value;
  }
}
