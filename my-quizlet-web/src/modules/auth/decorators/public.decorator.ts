import { SetMetadata } from '@nestjs/common';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export const Public = () => SetMetadata(AUTH_CONSTANTS.PUBLIC_KEY, true);
