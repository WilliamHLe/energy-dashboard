import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getEnergySavedAll } from '../../../services/energyService';
import { ISavedAllReturn } from '../../../types/interfaces';

require('highcharts/modules/sankey')(Highcharts);

/**
 * Creates a column chart for how much energy each building category has saved
 */
function EnergySaved() {
  const [data, setData] = useState<ISavedAllReturn[]>();

  useEffect(() => {
    const fetchData = async () => {
      setData(await getEnergySavedAll());
    };
    fetchData();
  }, []);
  // Options for Highcharts
  const options = {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    colors: ['#8AD515', '#00FFFF', '#FEB064', '#CECE00', '#F7A4F7',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%',
          color: 'white',
        },
      },
    },
    series: [
      {
        name: 'Bygg',
        data,
        showInLegend: false,
      },

    ],
    title: {
      text: 'Energi spart siden i fjor',
      style: {
        color: 'white',
      },
    },
    tooltip: {
      valueSuffix: '%',
    },
    xAxis: {
      type: 'category',
      labels: {
        style: {
          color: 'white',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Prosent ',
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: 'white',
        },
      },
    },
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default EnergySaved;
