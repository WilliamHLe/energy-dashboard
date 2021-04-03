import React from 'react';
import { useParams } from 'react-router';
import InfoItem from './InfoItem';
import Buildings from './icons/noto_house.png';
import Energy from './icons/energy.svg';
import Squaremeters from './icons/Group 223.svg';
import Energygoal from './icons/Group 222.svg';
import style from './infoItem.module.css';

interface building {
  energyUsed: number,
  energySaved: number,
  buildingArea: number,
  buildings: number
}
// mock data
const data:building = {
  energyUsed: 1234567,
  energySaved: 1234567,
  buildingArea: 1234567,
  buildings: 1234,
};

const InfoBar = () => {
  const { category } = useParams<{category:string | undefined}>();
  return (
    <div className={style.infobar}>
      <p className={style.categoryName}>{category?.toUpperCase() || 'TRONDHEIM KOMMUNE'}</p>
      <InfoItem heading={`${data.energyUsed} Kwh`} description="Brukt så langt i år" icon={Energy} />
      <InfoItem heading="utregning %" description="Spart så langt sammenlignet med i fjor" icon={Energygoal} />
      <InfoItem heading={`${data.buildingArea} m2`} description="Energioppfølges Trondheim kommune" icon={Squaremeters} />
      <InfoItem heading={data.buildings.toString()} description="Bygg som overvåkes" icon={Buildings} />
    </div>
  );
};
export default InfoBar;
