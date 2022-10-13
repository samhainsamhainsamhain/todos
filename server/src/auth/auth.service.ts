import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserDetails } from 'src/utils/types/auth/types';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userDetails: ValidateUserDetails): Promise<any> {
    const user = await this.usersService.findOneUser({
      username: userDetails.username,
    });

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await compareHash(
      userDetails.password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }
}
