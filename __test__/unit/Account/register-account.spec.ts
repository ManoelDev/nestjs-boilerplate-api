import { FakeHasher } from '__test__/_shared/_cryptography/fake-hasher';
import { InMemoryAccountsRepository } from '__test__/_shared/repository/in-memory-accounts.repository';
import { RegisterAccountUseCase } from '@/app/account/use-cases/register-account.use-case';

let inMemoryAccountsRepository: InMemoryAccountsRepository;
let fakeHasher: FakeHasher;

let sut: RegisterAccountUseCase;

describe('Register Account', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterAccountUseCase(inMemoryAccountsRepository, fakeHasher);
  });

  it('should be able to register a new account', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@123456Ab',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      account: inMemoryAccountsRepository.items[0],
    });
  });

  it('should hash account password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@123456Ab',
    });

    const hashedPassword = await fakeHasher.generate('@123456Ab');

    expect(result.isRight()).toBe(true);
    expect(inMemoryAccountsRepository.items[0].password).toEqual(hashedPassword);
  });
});
