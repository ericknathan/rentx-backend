import dayjs from 'dayjs';

import { AppError } from '@shared/errors/AppError';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let rentalReturnDate = dayjs().add(24, 'hours').toDate();

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(rentalReturnDate),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental when there is another open to same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: rentalReturnDate
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '131313',
        expected_return_date: rentalReturnDate
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental when there is another open to same car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: rentalReturnDate
      });

      await createRentalUseCase.execute({
        user_id: '12346',
        car_id: '121212',
        expected_return_date: rentalReturnDate
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // return date must be at least 24 hours from now
  it('should not be able to create a new rental when return date is less than 24 hours from now', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayjs().add(23, 'hours').toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});