import { Account } from '../entities/account';

export abstract class AccountsRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByEmail(email: string): Promise<Account | null>;

  abstract save(account: Account): Promise<void>;
  abstract create(account: Account): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
