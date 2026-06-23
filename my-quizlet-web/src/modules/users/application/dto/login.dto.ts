import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is not correct format' })
  @IsNotEmpty({ message: 'Email can not blank' })
  readonly email: string;

  @MinLength(8, { message: 'Must have over 8 characters' })
  @IsNotEmpty({ message: 'Password can not blank' })
  readonly password: string;
}
