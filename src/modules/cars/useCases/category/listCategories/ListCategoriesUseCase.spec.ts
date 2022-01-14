import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to list all categories', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category Test Description',
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual([category]);
  });
});
