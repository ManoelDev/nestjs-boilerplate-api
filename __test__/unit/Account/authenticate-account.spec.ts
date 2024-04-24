import { FakeEncrypter } from '__test__/_shared/_cryptography/fake-encrypter';
import { FakeHasher } from '__test__/_shared/_cryptography/fake-hasher';
import { FakeOTP } from '__test__/_shared/_cryptography/fake-otp';
import { makeAccount } from '__test__/_shared/factories/make-account';
import { InMemoryAccountsRepository } from '__test__/_shared/repository/in-memory-accounts.repository';
import { AuthenticateAccountUseCase } from '@/app/account/use-cases/authenticate-account.use-case';

let inMemoryAccountsRepository: InMemoryAccountsRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;
let otpCompare: FakeOTP;

let sut: AuthenticateAccountUseCase;

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateAccountUseCase(inMemoryAccountsRepository, fakeHasher, encrypter, otpCompare);
  });

  it('should be able to authenticate a account', async () => {
    const account = makeAccount({
      email: 'johndoe@example.com',
      password: await fakeHasher.generate('@123456Ab'),
    });

    inMemoryAccountsRepository.items.push(account);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '@123456Ab',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      access_token: expect.any(String),
    });
  });
});
