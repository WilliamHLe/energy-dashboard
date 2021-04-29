import mongoose from 'mongoose';
import { IBuilding } from '../api/models/buildings.model';
import { ICategory } from '../api/models/categories.model';

export interface BuildingCategory {
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

export interface EnergyCategory {
    category: ICategory,
    total: number
  }

export interface Carrier {
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

export interface CarrierCategory {
    category: ICategory,
    carriers: Carrier[]
  }

export interface Usage {
    usage: number,
    date: string
  }

export interface EnergyUsageCategory {
    category: ICategory,
    usage: Usage[]
  }
export interface EnergyAverage {
    average: number,
    date: string
  }

export interface EnergyAverageByCategory {
    category: ICategory,
    average: EnergyAverage[]
  }

export interface IMetrics {
    energyUsedCurrentYear: number,
    energyUsedLastYear: number,
    area: number,
    buildings: number,
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
