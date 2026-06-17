import { SetMetadata } from '@nestjs/common';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export const Roles = (...roles: string[]) =>
  SetMetadata(AUTH_CONSTANTS.ROLES_KEY, roles);
