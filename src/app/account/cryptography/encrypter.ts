export abstract class Encrypter {
  abstract encrypt(value: Record<string, unknown>): Promise<string>;
}
