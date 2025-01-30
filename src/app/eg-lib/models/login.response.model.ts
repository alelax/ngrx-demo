//import {User} from 'eg-lib/st-sdk/models/user.model';
import {User} from './user.model';

export interface LoginResponse {
  TokenAnswer: string;
  identity: User;
}
