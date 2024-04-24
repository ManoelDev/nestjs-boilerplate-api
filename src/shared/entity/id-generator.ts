import { randomUUID } from 'crypto';

export class UniqueEntityID {
  static generate(id?: string): string {
    return id ?? randomUUID();
  }

  public equals(id: UniqueEntityID) {
    return id === this;
  }
}
