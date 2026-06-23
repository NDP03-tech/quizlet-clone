import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email is not correct format' })
  @IsNotEmpty({ message: 'Email can not blank' })
  readonly email: string;

  @MinLength(8, { message: 'Must have over 8 characters' })
  @IsNotEmpty({ message: 'Password can not blank' })
  readonly password: string;
  @IsNotEmpty({ message: 'First name can not blank' })
  readonly firstName: string;
  @IsNotEmpty({ message: 'Last name can not blank' })
  readonly lastName: string;
}
