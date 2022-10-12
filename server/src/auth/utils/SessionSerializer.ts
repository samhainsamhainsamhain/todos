import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/entities/User';
import { IUserService } from 'src/users/user';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: IUserService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('SerializeUser \n\n', user, '----------');

    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findOneUser({ id: user.id });
    console.log('DeserializeUser \n\n', user, '\n\n', userDb, '----------');
    return userDb ? done(null, userDb) : done(null, null);
  }
}
