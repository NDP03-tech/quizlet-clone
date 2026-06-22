import { IPasswordHasher } from '../interfaces/password-hasher.interface';

export class Password {
  private constructor(
    private readonly value: string,
    private readonly isHashed: boolean,
  ) {}

  public static createFromPlain(plainText: string): Password {
    if (!plainText) throw new Error('Password is required');
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!regex.test(plainText)) {
      throw new Error(
        'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
      );
    }
    return new Password(plainText, false);
  }

  public static createFromHash(hashedText: string): Password {
    if (!hashedText) throw new Error('Hashed password is required');
    return new Password(hashedText, true);
  }

  public async toHash(hasher: IPasswordHasher): Promise<Password> {
    if (this.isHashed) return this;
    const hash = await hasher.hash(this.value);
    return new Password(hash, true);
  }

  public async compare(
    plainText: string,
    hasher: IPasswordHasher,
  ): Promise<boolean> {
    if (!this.isHashed) {
      throw new Error(
        'Cannot compare a plain text password. It must be hashed first.',
      );
    }
    return hasher.compare(plainText, this.value);
  }

  public getValue() {
    return this.value;
  }
}
