/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import style from './energyTips.module.css';
import SideButton from './SideButton';
import data from './EnergyTipsData.json';
import Image from '../../assets/icons/climate.png';

const EnergyTips = () => {
  const [selectedTopic, setSelectedTopic] = useState(0);

  function handleSelectTopic(id:number) {
    setSelectedTopic(id);
  }

  return (
    <>
      <h1 id={style.pageTitle}>ENERGITIPS</h1>
      <div className={style.energyTips}>
        <div className={style.sideButtons}>
          {/* eslint-disable-next-line max-len */}
          {data.map((button, index) => (<SideButton selected={selectedTopic} id={index} title={button.title} onSelect={handleSelectTopic} />))}
        </div>
        <div className={`container ${style.energyTipContent}`}>
          <div className={style.energyTipText}>
            <h1>{data[selectedTopic].title}</h1>
            <p>{data[selectedTopic].description}</p>
          </div>
        </div>
        <div className={`container ${style.twoPercent}`}>
          <div className={style.energyTipText}>
            <h1>2% målet</h1>
          </div>
        </div>
        <div className={style.niceFigure}>
          <img id={style.illustration} height="100%" src={Image} alt="Illustrasjon" />
        </div>
      </div>
    </>
  );
};

export default EnergyTips;
