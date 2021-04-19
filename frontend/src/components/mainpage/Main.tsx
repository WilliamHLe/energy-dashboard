import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

import Sankey from './graphs/Sankey';
import CategoryUsage from '../buildingCategoryOverview/graphs/CategoryUsage';
import style from './main.module.css';
import EnergySaved from '../graphs/EnergySaved';
import TwoPercentRace from './animation/TwoPercentRace';

function Main() {
  // eslint-disable-next-line no-unused-vars
  const saved = 2;

  return (
    <div className={style.main}>
      <div className={`container ${style.energyPercentageSaved}`}>
        <TwoPercentRace loading={false} />
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
