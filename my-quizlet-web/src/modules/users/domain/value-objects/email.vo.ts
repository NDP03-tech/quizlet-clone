import { InvalidEmailException } from '../exceptions/invalid-email.exception';

export class Email {
  private constructor(private readonly value: string) {}
  public static create(value: string): Email {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      throw new InvalidEmailException(value);
    }
    return new Email(value);
  }
  public getValue(): string {
    return this.value;
  }
}
