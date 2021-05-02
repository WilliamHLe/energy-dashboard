import mongoose from 'mongoose';
import { IBuilding } from '../api/models/buildings.model';
import { ICategory } from '../api/models/categories.model';

export interface IBuildingCategory {
  category: ICategory,
  buildings: string[]
}

export interface IBuildingEnergyTotal {
  _id: mongoose.Types.ObjectId,
  building: IBuilding,
  total: number,
}

export interface IBuildingScore {
  building: IBuilding,
  score: number,
}

export interface IEnergyCategory {
  category: ICategory,
  total: number
}

export interface ICarrier {
  name: string,
  amount: number
}

export interface IWeeklySaved {
  week: string,
  percentSaved: number,
}

export interface IWeeklyUsage {
  week: string,
  sum: number,
}

export interface ICarrierCategory {
  category: ICategory,
  carriers: ICarrier[]
}

export interface IUsage {
  usage: number,
  date: string
}

export interface IEnergyUsageCategory {
  category: ICategory,
  usage: IUsage[]
}
export interface IEnergyAverage {
  average: number,
  date: string
}

export interface IEnergyAverageByCategory {
  category: ICategory,
  average: IEnergyAverage[]
}

export interface IMetrics {
  energyUsedCurrentYear: number,
  energyUsedLastYear: number,
  area: number,
  buildings: number,
}

export interface IMetricsOut {
  energyUsed: number,
  energySaved: number,
  area: number,
  buildings: number
}

export interface IEnergyUsed {
  category: string,
  energyUsedLastYear: number,
  energyUsedCurrentYear: number,
}
export interface IEnergySaved {
  category: ICategory,
  saved: number,
}
export interface IParsedDates {
  fromDate: Date | undefined
  toDate: Date | undefined
}
