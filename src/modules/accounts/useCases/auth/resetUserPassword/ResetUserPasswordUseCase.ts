import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    console.log('1')

    if(!userToken) {
      throw new AppError('Invalid token');
    }

    console.log('2')

    if(this.dateProvider.compareIfExpired(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError('Token expired');
    }

    console.log('3')

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user) {
      throw new AppError('User not found');
    }
    
    console.log('4')
    
    const passwordHash = await hash(password, 8);
    user.password = passwordHash;

    console.log('5')

    await this.usersRepository.create(user);

    console.log('6')

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase }