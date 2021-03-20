import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

import Sankey from './graphs/Sankey';
import CategoryUsage from '../category/graphs/CategoryUsage';
import style from './main.module.css';
import EnergySaved from '../graphs/EnergySaved';

function Main() {
  const saved = 3.1;

  return (
    <div className={style.main}>
      <div className={`container ${style.ex}`} />
      <div className={`container ${style.energyPercentageSaved}`}>
        <div>
          <h2>{saved}</h2>
          Er så mye vi har spart de første 3 månedene i år sammenlignet med i fjor.
          <br />
          <button type="button">Les mer om 2% målet her</button>
        </div>
      </div>
      <div className={`container ${style.energySavedGraph}`}>
        <EnergySaved />
      </div>
      <div className={`container ${style.energyUsageGraph}`}>
        <CategoryUsage />
      </div>
      <div className={`container ${style.energySourceGraph}`}>
        <Sankey />
      </div>
    </div>
  );
}

export default Main;
