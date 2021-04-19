import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
    <Link to={`/${category}/${buildingName}`} className={style.buildingCard}>
      <h2>{index}</h2>
      <h2>{buildingName}</h2>
      <h2>{`${score}%`}</h2>
    </Link>
  );
};

export default CategoryTopListCard;
