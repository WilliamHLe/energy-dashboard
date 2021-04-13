import React from 'react';
import style from './compare.module.css';

type CardProps = {
    buildingName: string,
}

const CompareWithListCard = (props:CardProps) => {
  const { buildingName } = props;
  return (
    <a href={`${buildingName}`} className={style.buildingCard}>
      <h2>{buildingName}</h2>
    </a>
  );
};

export default CompareWithListCard;
