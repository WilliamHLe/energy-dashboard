import React from 'react';
import { useParams } from 'react-router';
import style from './building.module.css';
import CategoryUsage from '../buildingCategoryOverview/graphs/CategoryUsage';
import AverageUsage from './graphs/AverageUsage';
import HeatMapChart from './heatmap/HeatmapChart';

function Building() {
  const { category, id } = useParams<{category: string, id: string}>();
  // s
  return (
    <div className={style.building}>
      <div className={`container ${style.energyUsageGraph}`}>
        <CategoryUsage />
      </div>
      <div className={`container ${style.compareBuildings}`}>
        Bygg type:
        {' '}
        {category}
        , ID:
        {' '}
        {id}
      </div>
      <div className={`container ${style.previousYears}`}>
        <HeatMapChart />
      </div>
      <div className={`container ${style.energyAverage}`}>
        <AverageUsage />
      </div>
      <div className={`container ${style.energyTotal}`} />
      <div className={`container ${style.getTips}`} />
      <div className={`container ${style.energyPercentageSaved}`} />
      <div className={`container ${style.badges}`} />
    </div>
  );
}

export default Building;
