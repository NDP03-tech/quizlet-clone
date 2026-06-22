// src/modules/users/domain/interfaces/password-hasher.interface.ts
export interface IPasswordHasher {
  hash(plainText: string): Promise<string>;
  compare(plainText: string, hashedText: string): Promise<boolean>;
}
