import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';

import { UserMap } from '@modules/accounts/mapper/UserMap';

@injectable()
class UserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
