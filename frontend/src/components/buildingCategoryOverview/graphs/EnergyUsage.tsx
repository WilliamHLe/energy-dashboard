import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { IUsageReturn } from '../../../types/interfaces';

require('highcharts/modules/boost')(Highcharts);

/**
 * Creates a line chart with the energy usage for all categories, specific category or building
 * @param {Array} props.data Data to be used in the graph
 * @param {(string|null)} props.height Height for the graph. Only used in the comparison modal
 */
function EnergyUsage(props: {
  data: IUsageReturn[],
  height: string | null
}) {
  const { data, height } = props;
  // Options for Highcharts
  const options = {
    boost: {
      useGPUTranslations: true,
    },
    chart: {
      type: 'line',
      backgroundColor: null,
      height,
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    colors: ['#28d515', '#CE32E7', '#00FFFF', '#FEB064', '#CECE00',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: !height,
      itemStyle: {
        color: 'white',
      },
    },
    plotOptions: {
      line: {
        pointInterval: 86400000,
        pointStart: 1282408923000,
      },
      series: {
        style: {
          color: 'white',
        },
        turboThreshold: 0,
      },
    },
    navigator: {
      enabled: true,
      height: 20,
    },
    rangeSelector: {
      allButtonsEnabled: true,
      // Buttons that shows grouping when fully zoomed out
      // Allows to see total energy usage per month or year
      buttons: [{
        type: 'all',
        text: 'Dager',
        dataGrouping: {
          approximation: undefined,
          forced: true, // s
          units: [['week', [1]]],
        },
      },
      {
        type: 'all',
        text: 'Måneder',
        dataGrouping: {
          approximation: 'sum',
          forced: true,
          units: [['month', [1]]],
        },
      },
      {
        type: 'all',
        text: 'År',
        dataGrouping: {
          approximation: 'sum',
          forced: true, // s
          units: [['year', [1]]],
        },
      },
      ],
      buttonTheme: {
        width: 50,
      },
      inputStyle: {
        backgroundColor: '#020E26',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '5px',
      },
    },
    scrollbar: {
      enabled: false,
    },
    series: data,
    title: {
      text: 'Forbruk fordelt på ulike byggkategorier',
      style: {
        color: 'white',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key:%Y-%m-%d}</span><br/>',
      valueSuffix: ' kWh',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: 'white',
        },
        format: '{value:%Y-%b-%e}',
      },
    },
    yAxis: {
      title: {
        text: 'kWh',
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: 'white',
        },
      },
      tickAmount: 6,
    },
  };
  return (
    <HighchartsReact constructorType="stockChart" highcharts={Highcharts} options={options} />
  );
}

export default EnergyUsage;
