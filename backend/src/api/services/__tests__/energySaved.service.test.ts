import testUtil from '../../../util/__tests__/util';
import energySavedService from '../energySaved.service';
import Sensor, { ISensor } from '../../models/sensors.model';
import Building, { IBuilding } from '../../models/buildings.model';
import Category, { ICategory } from '../../models/categories.model';

interface MockData {
  category: ICategory | null,
  building: IBuilding | null,
  sensor: ISensor | null,
  currToDate: Date,
}

const data: MockData = {
  category: null,
  building: null,
  sensor: null,
  currToDate: new Date(2019, 5, 7),
};

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await testUtil.connectDatabase();

  data.category = await Category.create({
    name: 'skole',
  });

  data.building = await Building.create({
    name: 'Hello World',
    year: 2019,
    area: 200,
    categoryIdEsave: 124,
    categoryDescription: 'Text goes here',
    category: data.category.id,
  });

  data.sensor = await Sensor.create({
    description: 'Some description here',
    measurement: 'Fjernvarme',
    name: 'Name of sensor goes here',
    unitOfMeasurement: 'kWh',
    type: 'Forbruksmåler',
    building: data.building.id,
    measurements: [
      {
        date: new Date(2019, 3, 2),
        measurement: 10,
      },
      {
        date: new Date(2018, 3, 2),
        measurement: 20,
      },
      {
        date: new Date(2017, 3, 2),
        measurement: 10,
      },
    ],
  });
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await testUtil.closeDatabase();
});

describe('savedEnergyByBuilding', () => {
  it('Correctly calculates percentage energy saved', async () => {
    if (data.building === null) {
      throw Error('Failed to initialise test environment');
    }
    const result: number = await energySavedService.savedEnergyByBuilding(
      data.building,
      data.currToDate,
    );
    expect(result).toBe(50); // 50% reduction (20kWh last year, 10kWh this year)
  });

  it('Correclty calculates percentage energy usage increased', async () => {
    if (data.building === null) {
      throw Error('Failed to initialise test environment');
    }
    const result: number = await energySavedService.savedEnergyByBuilding(
      data.building,
      new Date(2018, 5, 7),
    );
    expect(result).toBe(-100); // 100% increase (5kWh last year, 20kWh this year)
  });
});
