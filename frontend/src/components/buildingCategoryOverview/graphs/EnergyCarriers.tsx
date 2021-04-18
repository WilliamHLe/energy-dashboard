import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import style from '../category.module.css';

require('highcharts/modules/sankey')(Highcharts);

function EnergyCarriers() {
  const [data, setData] = useState<{
    name:string,
    colorByPoint:boolean,
    data: { name: string; y: number; }[]
  }>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const mockData = [
      {
        name: 'Fjernvarme',
        amount: 13213,
      },
      {
        name: 'Fastkraft',
        amount: 13231,
      },
      {
        name: 'Bioenergi',
        amount: 123123,
      },
    ];
    const tempData: {name: string, colorByPoint:boolean, data: { name: string; y: number; }[]} = { name: 'Energibærer', colorByPoint: true, data: [] };
    for (let i = 0; i < mockData.length; i += 1) {
      tempData.data.push({ name: mockData[i].name, y: mockData[i].amount });
    }
    setData(tempData);
    setHeight(document.getElementsByClassName(style.energyCarriers)[0].clientHeight);
  }, []);
  //
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height,
    },
    title: {
      text: 'Energibærere',
      style: {
        color: 'white',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
      },
      series: {
        style: {
          color: 'white',
        },
        dataLabels: {
          color: 'white',
        },
      },
    },
    legend: {
      itemStyle: {
        color: 'white',
      },
    },
    series: data,
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default EnergyCarriers;
