import { AppError } from '@shared/errors/AppError';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new specification to an inexistent car', async () => {
    const car_id = '1234';
    const specifications_id = ['5678'];
    
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category'
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification Name',
      description: 'Specification Description'
    });

    const car_id = car.id;
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id, specifications_id });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
