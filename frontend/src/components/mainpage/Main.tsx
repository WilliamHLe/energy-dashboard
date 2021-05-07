import React, { useEffect, useState } from 'react';
import Sankey from './graphs/Sankey';
import EnergyUsage from '../buildingCategoryOverview/graphs/EnergyUsage';
import style from './main.module.css';
import EnergySaved from './graphs/EnergySaved';
import TwoPercentRace from './animation/TwoPercentRace';
import { getEnergyUsageAll } from '../../services/energyService';
import { IUsageReturn } from '../../types/interfaces';

function Main() {
  const [data, setData] = useState<IUsageReturn[]>([]);
  useEffect(() => {
    async function fetchData() {
      setData(await getEnergyUsageAll());
    }
    fetchData();
  }, []);

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
