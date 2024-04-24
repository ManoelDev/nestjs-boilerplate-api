import { Account } from '@/app/account/entities/account';
import { AccountsRepository } from '@/app/account/repositories/accounts.repository';
import { DomainEvents } from '@/shared/events/domain-events';

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = [];

  async findById(id: string) {
    const account = this.items.find((item) => item.id.toString() === id);
    if (!account) return null;
    return account;
  }

  async findByEmail(email: string) {
    const account = this.items.find((item) => item.email === email);
    if (!account) return null;
    return account;
  }

  async create(account: Account) {
    this.items.push(account);
    DomainEvents.dispatchEventsForAggregate(account.id);
  }

  async save(account: Account) {
    const index = this.items.findIndex((item) => item.id === account.id);
    this.items[index] = account;
    DomainEvents.dispatchEventsForAggregate(account.id);
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(index, 1);
  }
}
