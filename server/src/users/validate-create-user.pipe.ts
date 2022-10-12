import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.confirmPassword !== value.password)
      throw new HttpException(
        {
          statusCode: 400,
          message: `Confirmation Password doesn't match Password`,
        },
        HttpStatus.BAD_REQUEST,
      );

    return value;
  }
}
