import React from 'react';
import { useParams } from 'react-router';
import style from './building.module.css';
import CategoryUsage from '../category/graphs/CategoryUsage';

function Building() {
  const { category, id } = useParams<{category: string, id: string}>();

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
      <div className={`container ${style.previousYears}`} />
      <div className={`container ${style.energyAverage}`} />
      <div className={`container ${style.energyTotal}`} />
      <div className={`container ${style.getTips}`} />
      <div className={`container ${style.energyPercentageSaved}`} />
      <div className={`container ${style.badges}`} />
    </div>
  );
}

export default Building;
