import { makeAccount } from '__test__/_shared/factories/make-account';
import { InMemoryAccountsRepository } from '__test__/_shared/repository/in-memory-accounts.repository';
import { OnAccountCreated } from '@/app/notification/subscribers/on-account-created';
import { SendMailNotificationUseCase } from '@/app/notification/use-cases/send-mail-notification.use-case';

let inMemoryAccountsRepository: InMemoryAccountsRepository;
let sendMailNotificationUseCase: SendMailNotificationUseCase;

describe('On Account Created', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository();
    sendMailNotificationUseCase = new SendMailNotificationUseCase();
  });

  it('should send a mail notification when Account is created', async () => {
    const _onAccountCreated = new OnAccountCreated(inMemoryAccountsRepository, sendMailNotificationUseCase);

    const account = makeAccount();

    inMemoryAccountsRepository.create(account);
  });
});
