import mongoose from 'mongoose';
import testUtil from '../../../util/__tests__/util';
import energyAverageService from '../energyAverage.service';
import Sensor, { ISensor } from '../../models/sensors.model';
import Building, { IBuilding } from '../../models/buildings.model';
import Category, { ICategory } from '../../models/categories.model';
import { IEnergyAverageByCategory } from '../../../types/interfaces';

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
    _id: new mongoose.Types.ObjectId('6093a8e7c165f7a41d6a613b'), // id hardcoded for snapshot test
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
        date: new Date(2020, 4, 7),
        measurement: 1,
      },
      {
        date: new Date(2020, 0, 3),
        measurement: 2,
      },
      {
        date: new Date(2015, 9, 14),
        measurement: 7,
      },
    ],
  });

  const category = await Category.create({
    _id: new mongoose.Types.ObjectId('6093a8e7c165f7a41d6a6141'), // id hardcoded for snapshot test
    name: 'idrettsbygg',
  });

  const building = await Building.create({
    name: 'Hello World',
    year: 2019,
    area: 200,
    categoryIdEsave: 124,
    categoryDescription: 'Text goes here',
    category: category.id,
  });

  await Sensor.create({
    description: 'Some description here',
    measurement: 'Fjernvarme',
    name: 'Sensor for building not used',
    unitOfMeasurement: 'kWh',
    type: 'Forbruksmåler',
    building: building.id,
    measurements: [
      {
        date: new Date(2020, 4, 7),
        measurement: 200,
      },
      {
        date: new Date(2015, 9, 14),
        measurement: 100,
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

describe('averageByYearForBuildings', () => {
  it('Calculates correct yearly average for a list of buildings', async () => {
    const result: number = await energyAverageService.averageByYearForBuildings(
      [data.building?.id],
    );
    // 2kWh in 2020, 7kWh in 2015 => 10kWh total / 2 years => 5 kwH average
    expect(result).toBe(5);
  });
});

describe('averageByYearForCategories', () => {
  it('', async () => {
    const res: IEnergyAverageByCategory[] = await energyAverageService.averageByYearForCategories();
    expect(res).toMatchSnapshot();
  });
});
