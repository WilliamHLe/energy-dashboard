import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import InfoItem from './InfoItem';
import Buildings from './icons/noto_house.png';
import Energy from './icons/energy.svg';
import Squaremeters from './icons/Group 223.svg';
import Energygoal from './icons/Group 222.svg';
import style from './infoItem.module.css';
import getMetrics from '../../services/metricsService';
import { IMetricsData } from '../../types/interfaces';

const InfoBar = () => {
  // Using the URL parameters to fetch the correct metrics for the specific page
  const { category, id } = useParams<{category:string | undefined, id:string | undefined}>();
  // The current metrics for the info bars
  const [data, setData] = useState<IMetricsData>({
    energyUsed: 0,
    energySaved: 0,
    area: 0,
    buildings: 0,
  });

  // Fetching the metrics for a specific building category or the front page using the URL parameter
  useEffect(() => {
    const fetchData = async () => {
      setData(await getMetrics(category));
    };
    fetchData();
  }, [category]);

  return (
    <div className={style.infobar}>
      <h1 className={style.categoryName}>{id?.toUpperCase() || category?.toUpperCase() || 'TRONDHEIM KOMMUNE'}</h1>
      <InfoItem heading={`${data.energyUsed} Kwh`} description="Brukt så langt i år" icon={Energy} />
      <InfoItem heading={`${data.energySaved} %`} description="Spart så langt sammenlignet med i fjor" icon={Energygoal} />
      <InfoItem heading={`${data.area} m2`} description="Energioppfølges Trondheim kommune" icon={Squaremeters} />
      <InfoItem heading={data.buildings.toString()} description="Bygg som overvåkes" icon={Buildings} />
    </div>
  );
};
export default InfoBar;
