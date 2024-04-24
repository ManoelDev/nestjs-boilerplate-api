import { AggregateRoot } from '@/shared/aggregates/aggregate-root';
import { UniqueEntityID } from '@/shared/entity/unique-entity-id';
import { Optional } from '@prisma/client/runtime/library';

import { AccountCreatedEvent } from '../events/account-created-event';
import { AccountUpdatedEvent } from '../events/account-updated-event';

export interface AccountProps {
  name: string | null;
  email: string;
  password: string;
  twoFactorSecret: string | null;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Account extends AggregateRoot<AccountProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get twoFactorSecret() {
    return this.props.twoFactorSecret;
  }

  get twoFactorEnabled() {
    return this.props.twoFactorEnabled;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set name(name: string | null) {
    this.props.name = name;
    this.updated();
  }

  set email(email: string) {
    this.props.email = email;
    this.updated();
  }

  set password(password: string) {
    this.props.password = password;
    this.updated();
  }

  set twoFactorSecret(secret: string | null) {
    this.props.twoFactorSecret = secret;
    this.updated();
  }
  set twoFactorEnabled(enabled: boolean) {
    this.props.twoFactorEnabled = enabled;
    this.updated();
  }

  private updated() {
    this.props.updatedAt = new Date();
  }

  touch() {
    this.updated();
    this.addDomainEvent(new AccountUpdatedEvent(this));
  }

  static create(props: Optional<AccountProps, 'createdAt'>, id?: UniqueEntityID) {
    const account = new Account({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });

    const isNewAccount = !id;
    if (isNewAccount) account.addDomainEvent(new AccountCreatedEvent(account));

    return account;
  }
}
