import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import InfoItem from './InfoItem';
import Buildings from './icons/noto_house.png';
import Energy from './icons/energy.svg';
import Squaremeters from './icons/Group 223.svg';
import Energygoal from './icons/Group 222.svg';
import style from './infoItem.module.css';

interface building {
  energyUsed: number,
  energySaved: number,
  area: number,
  buildings: number
}

const InfoBar = () => {
  const { category } = useParams<{category:string | undefined}>();
  const [data, setData] = useState<building>({
    energyUsed: 0,
    energySaved: 0,
    area: 0,
    buildings: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        const results = await axios.get(`/metrics/${category}`);
        setData(results.data);
      } else {
        const results = await axios.get('/metrics');
        setData(results.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className={style.infobar}>
      <h1 className={style.categoryName}>{category?.toUpperCase() || 'TRONDHEIM KOMMUNE'}</h1>
      <InfoItem heading={`${data.energyUsed} Kwh`} description="Brukt så langt i år" icon={Energy} />
      <InfoItem heading={`${data.energySaved} %`} description="Spart så langt sammenlignet med i fjor" icon={Energygoal} />
      <InfoItem heading={`${data.area} m2`} description="Energioppfølges Trondheim kommune" icon={Squaremeters} />
      <InfoItem heading={data.buildings.toString()} description="Bygg som overvåkes" icon={Buildings} />
    </div>
  );
};
export default InfoBar;
