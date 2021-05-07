export interface ICategory {
    id: string,
    name: string
}

export interface IUsageData {
    date: string,
    value: number,
}

interface IUsageAllData {
    category: ICategory,
    usage: IUsageData[],
}

export interface IUsageAll {
    data: IUsageAllData[]
}

export interface IUsageSlug {
    data: IUsageData[]
}

export interface IUsageResponseData {
    x: number,
    y: number,
}

export interface IUsageReturn {
    name: string,
    data: IUsageResponseData[]
}

export interface ICarriers {
    name: string,
    amount: number,
}

interface ICarriersAllData {
    category: ICategory,
    carriers: ICarriers[]
}

export interface ICarriersAll {
    data: ICarriersAllData[]
}

export interface ICarriersAllReturn {
    keys: string[],
    data: any[],
    name: string,
    type: string,
}

export interface ICarriersCategory {
    data: ICarriers[]
}

export interface ICarriersCategoryReturnData {
    name: string,
    y: number,
}

export interface ICarriersCategoryReturn {
    name: string,
    colorByPoint:boolean,
    data: ICarriersCategoryReturnData[]
}

interface ISavedAllData {
    category: ICategory,
    saved: number,
}

export interface ISavedAll {
    data: ISavedAllData[]
}

export interface ISavedAllReturn {
    name: string,
    y: number
}

export interface ISavedTotalData {
    percentSaved: number
}

export interface ISavedTotal {
    data: ISavedTotalData
}

interface ISavedWeeklyData {
    week: string,
    percentSaved: number
}

export interface ISavedWeekly {
    data: ISavedWeeklyData[]
}

export interface IAverageData {
    averageEnergy: number
}

export interface IAverage {
    data: IAverageData
}

export interface IBuildingsData {
    id: string,
    name: string,
    year: number | null,
    area?: number,
    categoryIdEsave?: number,
    categoryDescription?: string,
    category: ICategory,
    tek?: string,
    energyLabel?: string
}

export interface IBuilding {
    data: IBuildingsData
}

export interface IBuildings {
    data: IBuildingsData[]
}

export interface IHighscoreData {
    building: IBuildingsData,
    score: number
}

export interface IHighscore {
    data: IHighscoreData[]
}

export interface IMetricsData {
    energyUsed: number,
    energySaved: number,
    area: number,
    buildings: number,
}

export interface IMetrics {
    data: IMetricsData
}
