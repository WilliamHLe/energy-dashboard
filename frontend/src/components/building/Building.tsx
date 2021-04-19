import React from 'react';
import { useParams } from 'react-router';
import style from './building.module.css';
import CategoryUsage from '../buildingCategoryOverview/graphs/CategoryUsage';
import AverageUsage from './graphs/AverageUsage';
import Compare from './compare/Compare';
import HeatMapChart from './heatmap/HeatmapChart';
import EnergySaved from './graphs/EnergySaved';

function Building() {
  const { category, id } = useParams<{ category: string, id: string }>();
  // s
  return (
    <div className={style.building}>
      <div className={`container ${style.energyUsageGraph}`}>
        <CategoryUsage />
      </div>
      <div className={`container ${style.compareBuildings}`}>
        <Compare />
      </div>
      <div className={`container ${style.previousYears}`}>
        <HeatMapChart />
      </div>
      <div className={`container ${style.energyAverage}`}>
        <AverageUsage />
      </div>
      <div className={`container ${style.energyTotal}`} />
      <div className={`container ${style.getTips}`} />
      <div className={`container ${style.energyPercentageSaved}`}>
        <EnergySaved />
      </div>
      <div className={`container ${style.badges}`}>
        Bygg type:
        {' '}
        {category}
        , ID:
        {' '}
        {id}
      </div>
    </div>
  );
}

export default Building;
