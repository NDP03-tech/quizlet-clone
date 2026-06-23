import { randomUUID } from 'crypto';

export class UserId {
  private constructor(private readonly value: string) {}

  public static create(value: string): UserId {
    if (!value) {
      throw new Error('UserId is required');
    }

    return new UserId(value);
  }

  public static generate(): UserId {
    return new UserId(randomUUID());
  }

  public getValue(): string {
    return this.value;
  }
}
