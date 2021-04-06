import React from 'react';
import style from './category.module.css';
import CategoryUsage from './graphs/CategoryUsage';
import CategoryTopList from './topList/CategoryTopList';

function BuildingCategoryOverview() {
  return (
    <div className={style.category}>
      <div className={`container ${style.energyUsageGraph}`}>
        <CategoryUsage />
      </div>
      <CategoryTopList />
      <div className={`container ${style.energyCarriers}`} />
      <div className={`container ${style.tips}`} />
    </div>
  );
}

export default BuildingCategoryOverview;
