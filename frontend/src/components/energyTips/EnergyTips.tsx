import React from 'react';
import style from './energyTips.module.css';

const EnergyTips = () => (
  <div className={style.energyTips}>

    <div className={style.sideButtons}>
      <button type="button">
        Varmepumpe
      </button>

      <button type="button">
        Etterisolasjon
      </button>

      <button type="button">
        Varmepumpe
      </button>
    </div>

    <div className={`container ${style.energyTipContent}`}>
      <h1>
        Varmepumpe
      </h1>
      <p>
        (Her skal det komme noen tips til energi sparing)
      </p>
    </div>

    <div className={`container ${style.twoPercent}`}>
      <p>
        Info om 2% mål
      </p>
    </div>

    <div className={style.niceFigure}>
      <p>
        (her kommer det et bilde)
      </p>
    </div>

  </div>
);

export default EnergyTips;
