import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './category.module.css';
import EnergyUsage from './graphs/EnergyUsage';
import EnergyCarriers from './graphs/EnergyCarriers';
import CategoryTopList from './topList/CategoryTopList';
import { getEnergyUsage } from '../../services/energyService';

function BuildingCategoryOverview() {
  const { category, id } = useParams<{category:string, id:string}>();
  const [data, setData] = useState<{ name: string, data: { x: number, y: number }[] }[]>([]);
  useEffect(() => {
    async function fetchData() {
      setData(await getEnergyUsage(category, id));
    }
    fetchData();
  }, [category, id]);

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
