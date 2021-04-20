import React from 'react';
import style from './compare.module.css';

type CardProps = {
    buildingName: string,
}

const CompareWithListCard = (props:CardProps) => {
  const { buildingName } = props;
  return (
    <div className={style.buildingCard}>
      <h2>{buildingName}</h2>
    </div>
  );
};

export default CompareWithListCard;
