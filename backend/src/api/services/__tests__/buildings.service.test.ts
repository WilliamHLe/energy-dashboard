import testUtil from '../../../util/__tests__/util';
import buildingService from '../buildings.service';
import Building, { IBuilding } from '../../models/buildings.model';
import Category, { ICategory } from '../../models/categories.model';
import { IBuildingCategory } from '../../../types/interfaces';

interface MockData {
  category0: ICategory | null,
  category1: ICategory | null,
  building0: IBuilding | null,
  building1: IBuilding | null,
}

const data: MockData = {
  category0: null,
  category1: null,
  building0: null,
  building1: null,
};

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await testUtil.connectDatabase();

  data.category0 = await Category.create({
    name: 'skole',
  });

  data.building0 = await Building.create({
    name: 'Hello World',
    year: 2019,
    area: 200,
    categoryIdEsave: 124,
    categoryDescription: 'Text goes here',
    category: data.category0.id,
  });

  data.category1 = await Category.create({
    name: 'barnehage',
  });

  data.building1 = await Building.create({
    name: 'Other building',
    year: 1234,
    area: 42,
    categoryIdESave: 666,
    categoryDescription: 'Some cool description',
    category: data.category1.id,
  });
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await testUtil.closeDatabase();
});

describe('findBuildingByName', () => {
  it('Finds the building by uppercase name', async () => {
    const building: IBuilding | null = await buildingService.findBuildingByName('HELLO WORLD');
    expect(building).not.toBeNull();
    expect(building?.toObject).toEqual(data.building0?.toObject);
  });

  it('Finds the building by lowercase name', async () => {
    const building: IBuilding | null = await buildingService.findBuildingByName('hello world');
    expect(building).not.toBeNull();
    expect(building?.toObject).toEqual(data.building0?.toObject);
  });

  it('Finds the building by exact name', async () => {
    const building: IBuilding | null = await buildingService.findBuildingByName('Hello World');
    expect(building).not.toBeNull();
    expect(building?.toObject()).toEqual(data.building0?.toObject());
  });

  it('Returns null if no building with the given name exists', async () => {
    const building = await buildingService.findBuildingByName('No building with This name');
    expect(building).toBeNull();
  });
});

describe('buildingsGroupedByCategory', () => {
  it('Correctly groups building by category', async () => {
    const result: IBuildingCategory[] = await buildingService.buildingsGroupedByCategory();
    const expectedResult = [
      {
        buildings: [data.building1?.id],
        category: data.category1,
      },
      {
        buildings: [data.building0?.id],
        category: data.category0,
      },
    ];

    expect(result).toHaveLength(2);
    expect(result[0].buildings).toHaveLength(1);
    expect(result[1].buildings).toHaveLength(1);
    expect(result[0].buildings).not.toEqual(result[1].buildings);
    expect(result[0].category).not.toBe(result[1].category);
    expect(result.toString).toEqual(expectedResult.toString);
  });
});
