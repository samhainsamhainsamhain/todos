import { User } from 'src/typeorm/entities/User';
import { ValidateUserDetails } from 'src/utils/types/auth/types';

export interface IAuthService {
  validateUser(userDetails: ValidateUserDetails): Promise<User | null>;
}
