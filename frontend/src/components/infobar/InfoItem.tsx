import React from 'react';
import style from './infoItem.module.css';

type InfoItemProps = {
    heading: string,
    description: string,
    icon: string
}
const InfoItem = (props: InfoItemProps) => {
  const { heading, description, icon } = props;

  return (
    <div className={style.wrapper}>
      <img className={style.icon} src={icon} alt="icon" />
      <span className={style.heading}>{heading}</span>
      <span className={style.description}>{description}</span>
    </div>
  );
};

export default InfoItem;
