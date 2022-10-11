import { ValidateUserDetails } from 'src/utils/types/auth/types';

export interface IAuthService {
  validateUser(userDetails: ValidateUserDetails);
}
