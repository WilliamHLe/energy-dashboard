import React from 'react';
import { useParams } from 'react-router';
import style from './category.module.css';
import CategoryUsage from './graphs/CategoryUsage';
import EnergyCarriers from './graphs/EnergyCarriers';

function BuildingCategoryOverview() {
  const { category } = useParams<{category:string}>();

  return (
    <div className={style.category}>
      <div className={`container ${style.energyUsageGraph}`}>
        <CategoryUsage />
      </div>
      <div className={`container ${style.buildingList}`}>
        Kategori:
        {' '}
        {category}
      </div>
      <div className={`container ${style.energyCarriers}`}>
        <EnergyCarriers />
      </div>
      <div className={`container ${style.tips}`} />
    </div>
  );
}

export default BuildingCategoryOverview;
