import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/sankey')(Highcharts);

function CategotyUsage() {
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Forbruk fordelt på ulike byggkategorier',
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: 'kWh',
      },
    },
    xAxis: {
      categories: [2016, 2017, 2018, 2019, 2020, 2021],
      title: {
        text: 'År',
      },
    },
    series: [
      {
        name: 'Skoler',
        data: [8300, 9600, 5680, 7200, 5540, 5810],
      },
      {
        name: 'Barnehager',
        data: [5530, 5700, 4010, 5500, 4000, 3970],
      },
      {
        name: 'Sykehjem',
        data: [4150, 2400, 3010, 1890, 3060, 3200],
      },
      {
        name: 'Idrettshaller',
        data: [6220, 7080, 5800, 6980, 4250, 4500],
      },
      {
        name: 'Andre bygg',
        data: [2070, 4230, 3020, 4240, 1950, 4020],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default CategotyUsage;
