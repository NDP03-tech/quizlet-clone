export class InvalidUserStatusException extends Error {
  constructor(message: string) {
    super(message);
  }
}
