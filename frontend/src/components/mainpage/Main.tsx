import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

import Sankey from './graphs/Sankey';
import CategoryUsage from './graphs/CategoryUsage';
import style from './main.module.css';

function Main() {
  return (
    <div className={style.main}>
      <div className={`container ${style.ex}`} />
      <div className={`container ${style.ex2}`} />
      <div className={`container ${style.ex3}`} />
      <div className={style.energyUsageGraph}>
        <CategoryUsage />
      </div>
      <div className={style.energySourceGraph}>
        <Sankey />
      </div>
    </div>
  );
}

export default Main;
