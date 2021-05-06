import testUtil from '../../../util/__tests__/util';
import categoryService from '../category.service';
import Category, { ICategory } from '../../models/categories.model';

let category: ICategory | null = null;

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await testUtil.connectDatabase();

  category = await Category.create({
    name: 'Skole',
  });
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await testUtil.closeDatabase();
});

describe('findCategoryByName', () => {
  it('Finds the category by uppercase name', async () => {
    const result: ICategory | null = await categoryService.findCategoryByName('SKOLE');
    expect(result).not.toBeNull();
    expect(result?.toObject()).toEqual(category?.toObject());
  });

  it('Finds the category by lowercase name', async () => {
    const result: ICategory | null = await categoryService.findCategoryByName('skole');
    expect(result).not.toBeNull();
    expect(result?.toObject()).toEqual(category?.toObject());
  });

  it('Finds the category by exact name', async () => {
    const result: ICategory | null = await categoryService.findCategoryByName('Skole');
    expect(result).not.toBeNull();
    expect(result?.toObject()).toEqual(category?.toObject());
  });

  it('Returns null if no category with the given name exists', async () => {
    const result = await categoryService.findCategoryByName('No category with This name');
    expect(result).toBeNull();
  });
});
