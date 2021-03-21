import React from 'react';
import { useParams } from 'react-router';
import style from './category.module.css';
import CategotyUsage from './graphs/CategoryUsage';

function Category() {
  const { category } = useParams<{category:string}>();

  return (
    <div className={style.category}>
      <div className={`container ${style.energyUsageGraph}`}>
        <CategotyUsage />
      </div>
      <div className={`container ${style.buildingList}`}>
        Kategori:
        {' '}
        {category}
      </div>
      <div className={`container ${style.energyCarriers}`} />
      <div className={`container ${style.tips}`} />
    </div>
  );
}

export default Category;
