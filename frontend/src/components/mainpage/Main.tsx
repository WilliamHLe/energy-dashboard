import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import Sankey from './graphs/Sankey';
import EnergyUsage from '../buildingCategoryOverview/graphs/EnergyUsage';
import style from './main.module.css';
import EnergySaved from './graphs/EnergySaved';
import TwoPercentRace from './animation/TwoPercentRace';
import { getEnergyUsage } from '../../services/energyService';

function Main() {
  const { category, id } = useParams<{category:string, id:string}>();
  const [data, setData] = useState<{ name: string, data: { x: number, y: number }[] }[]>([]);
  useEffect(() => {
    async function fetchData() {
      setData(await getEnergyUsage(category, id));
    }
    fetchData();
  }, [category, id]);

  return (
    <div className={style.main}>
      <div className={`container ${style.energyPercentageSaved}`}>
        <TwoPercentRace loading={false} />
      </div>
      <div className={`container ${style.energySavedGraph}`}>
        <EnergySaved />
      </div>
      <div className={`container ${style.energyUsageGraph}`}>
        <EnergyUsage data={data} height={null} />
      </div>
      <div className={`container ${style.energySourceGraph}`}>
        <Sankey />
      </div>
    </div>
  );
}

export default Main;
