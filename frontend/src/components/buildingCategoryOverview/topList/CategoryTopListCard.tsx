import React from 'react';
import { useParams } from 'react-router';
import style from './topList.module.css';

type CategoryTopListCardProps = {
    buildingName: string,
    index: number,
    score: number
}

const CategoryTopListCard = (props:CategoryTopListCardProps) => {
  const { category } = useParams<{category:string}>();
  const { buildingName, index, score } = props;
  return (
    <a href={`${category}/${buildingName}`} className={style.buildingCard}>
      <h2>{index}</h2>
      <h2>{buildingName}</h2>
      <h2>{`${score}%`}</h2>
    </a>
  );
};

export default CategoryTopListCard;
