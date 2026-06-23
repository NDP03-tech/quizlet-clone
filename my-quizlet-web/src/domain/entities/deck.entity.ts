import { randomUUID } from 'crypto';

export class DeckDomain {
  id = randomUUID();
  name: string;
  ownerId: string;
}
