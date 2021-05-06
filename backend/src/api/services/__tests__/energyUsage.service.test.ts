import testUtil from '../../../util/__tests__/util';
import energyUsageService from '../energyUsage.service';
import Sensor, { ISensor } from '../../models/sensors.model';
import Building, { IBuilding } from '../../models/buildings.model';
import Category, { ICategory } from '../../models/categories.model';

interface MockData {
  category: ICategory | null,
  building: IBuilding | null,
  sensor: ISensor | null,
}

const data: MockData = {
  category: null,
  building: null,
  sensor: null,
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
        date: new Date(2015, 3, 2),
        measurement: 5,
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

describe('sumEnergyUsageByIds', () => {
  it('Returns the correct total energy usage given no dates', async () => {
    const result: number = await energyUsageService.sumEnergyUsageByIds(
      [data.building?.id],
    );
    expect(result).toBe(35);
  });

  it('Returns the correct total energy usage given fromDate', async () => {
    const result: number = await energyUsageService.sumEnergyUsageByIds(
      [data.building?.id],
      new Date(2018, 10, 10), // only measurements after 2019 exists in this dateslot
    );
    expect(result).toBe(10);
  });

  it('Returns the correct total energy usage given toDate', async () => {
    const result: number = await energyUsageService.sumEnergyUsageByIds(
      [data.building?.id],
      undefined,
      new Date(2018, 1, 1),
    );
    expect(result).toBe(5);
  });

  it('Returns the correct total energy usage given fromDate and toDate', async () => {
    const result: number = await energyUsageService.sumEnergyUsageByIds(
      [data.building?.id],
      new Date(2019, 0, 1),
      new Date(2019, 5, 7),
    );
    expect(result).toBe(10);
  });
});
