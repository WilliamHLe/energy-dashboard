import React, { useState } from 'react';
import style from './energyTips.module.css';
import SideButton from './SideButton';
import data from './EnergyTipsData.json';
import Image from '../../assets/icons/climate.png';

const EnergyTips = () => {
  // The energy tip that is displayed on the page. The default is "bytte vindu".
  const [selectedTopic, setSelectedTopic] = useState(0);

  // Changing the energy tip displayed by clicking one of the side-buttons.
  function handleSelectTopic(id:number) {
    setSelectedTopic(id);
  }

  return (
    <>
      <h1 id={style.pageTitle}>ENERGITIPS</h1>
      <div className={style.energyTips}>
        <div className={style.sideButtons}>
          {data.map((button, index) => (
            <SideButton
              selected={selectedTopic}
              id={index}
              title={button.title}
              onSelect={handleSelectTopic}
            />
          ))}
        </div>
        <div className={`container ${style.energyTipContent}`}>
          <div className={style.energyTipText}>
            <h1>{data[selectedTopic].title}</h1>
            <p>{data[selectedTopic].description}</p>
            <p className={style.subheader}>{`${data[selectedTopic].title} egner seg for deg som:` }</p>
            <ul>
              {data[selectedTopic].who?.map((punkt) => (
                <li>
                  {punkt}
                </li>
              ))}
            </ul>
            <p className={style.subheader}>{`Gode grunner til å montere ${data[selectedTopic].title}:` }</p>
            <ul>
              {data[selectedTopic].why?.map((punkt) => (
                <li>
                  {punkt}
                </li>
              ))}
            </ul>
            <p className={style.source}>{data[selectedTopic].source}</p>
          </div>
        </div>
        <div className={`container ${style.twoPercent}`}>
          <div className={style.energyTipText}>
            <h1>2% målet</h1>
            <p>
              2% målet er et mål om at alle bygg i kommunen
              skal bruke 2% mindre energi enn året før. Om vi alle gjør dette kan
              vi spare store mengder energi og dermed skape en mer klimavennlig og
              bærekraftig by, i tillegg til at vi tar et steg i riktig retning for
              å stoppe klimaendringene og få en grønnere og friskere planet.
            </p>
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
