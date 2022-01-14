import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minCompareHours = 24;

    const carIsUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (carIsUnavailable) {
      throw new AppError('Car is already rented');
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minCompareHours) {
      throw new AppError(
        'Expected return date must be at least 24 hours from now'
      );
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
