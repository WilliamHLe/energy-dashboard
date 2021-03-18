import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/sankey')(Highcharts);

function Sankey() {
  const options = {
    chart: {
      backgroundColor: null,
      color: 'white',
    },
    title: {
      text: 'Energibærere',
      style: {
        color: 'white',
      },
    },
    dataLabels: {

    },
    credits: {
      enabled: false,
    },
    series: [
      {
        keys: ['from', 'to', 'weight'],
        data: [
          ['Skole', 'Fjernvarme', 2],
          ['Skole', 'Bioenergi', 2],
          ['Barnehage', 'Fjernvarme', 1],
          ['Barnehage', 'Bioenergi', 2],
          ['Idrettshaller', 'Fjernvarme', 2],
          ['Idretthaller', 'Fastkraft', 1],
          ['Sykehjem', 'Bioenergi', 1],
          ['Sykehjem', 'Olje', 2],
          ['Andre bygg', 'Fastkraft', 1],
          ['Andre bygg', 'Olje', 2],
        ],
        type: 'sankey',
        name: 'Energibærer',
      },
    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default Sankey;
