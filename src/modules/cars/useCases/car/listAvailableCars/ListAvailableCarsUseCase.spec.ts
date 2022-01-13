import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name 1',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'DEF-1235',
      fine_amount: 60,
      brand: 'Brand_test',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand_test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name 2',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'GHI-1236',
      fine_amount: 60,
      brand: 'Brand_test',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car Name 2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name 3',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'GHI-1236',
      fine_amount: 60,
      brand: 'Brand_test',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345'
    });

    expect(cars).toEqual([car]);
  });
});
