import dayjs from 'dayjs';

import { AppError } from '@shared/errors/AppError';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalReturnDate = dayjs().add(24, 'hours').toDate();

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();;
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand'
    })
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: new Date(rentalReturnDate),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental when there is another open to same user', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: rentalReturnDate
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '131313',
        expected_return_date: rentalReturnDate
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for this user!"));
  });

  it('should not be able to create a new rental when there is another open to same car', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: rentalReturnDate
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12346',
        car_id: '121212',
        expected_return_date: rentalReturnDate
      })
    ).rejects.toEqual(new AppError('Car is already rented'));
  });

  // return date must be at least 24 hours from now
  it('should not be able to create a new rental when return date is less than 24 hours from now', async () => {
    expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayjs().add(23, 'hours').toDate()
      })
    ).rejects.toEqual(new AppError('Expected return date must be at least 24 hours from now'));
  });
});
