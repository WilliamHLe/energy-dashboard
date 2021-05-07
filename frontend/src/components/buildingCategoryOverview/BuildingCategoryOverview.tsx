import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './category.module.css';
import EnergyUsage from './graphs/EnergyUsage';
import EnergyCarriers from './graphs/EnergyCarriers';
import CategoryTopList from './topList/CategoryTopList';
import { getEnergyUsageSlug } from '../../services/energyService';
import { IUsageReturn } from '../../types/interfaces';

function BuildingCategoryOverview() {
  const { category } = useParams<{category: string, id: string}>();
  const [data, setData] = useState<IUsageReturn[]>([]);
  useEffect(() => {
    async function fetchData() {
      setData(await getEnergyUsageSlug(category));
    }
    fetchData();
  }, [category]);

  return (
    <div className={style.category}>
      <div className={`container ${style.energyUsageGraph}`}>
        <EnergyUsage data={data} height={null} />
      </div>
      <CategoryTopList />
      <div className={`container ${style.energyCarriers}`}>
        <EnergyCarriers />
      </div>
      <div className={`container ${style.tips}`} />
    </div>
  );
}

export default BuildingCategoryOverview;
