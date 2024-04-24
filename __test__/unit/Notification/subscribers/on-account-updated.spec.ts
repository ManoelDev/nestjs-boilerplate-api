import { makeAccount } from '__test__/_shared/factories/make-account';
import { InMemoryAccountsRepository } from '__test__/_shared/repository/in-memory-accounts.repository';
import { OnAccountUpdate } from '@/app/notification/subscribers/on-account-updatey';
import { SendMailNotificationUseCase } from '@/app/notification/use-cases/send-mail-notification.use-case';

let inMemoryAccountsRepository: InMemoryAccountsRepository;
let sendMailNotificationUseCase: SendMailNotificationUseCase;

describe('On Account Update', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository();
    sendMailNotificationUseCase = new SendMailNotificationUseCase();
  });

  it('should send a mail notification when Account is updated', async () => {
    const _onAccountCreated = new OnAccountUpdate(sendMailNotificationUseCase);

    const account = makeAccount();
    inMemoryAccountsRepository.create(account);

    account.name = 'New Name';
    inMemoryAccountsRepository.save(account);
  });
});
