import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router';
import style from '../category.module.css';

// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require('axios').default;

function EnergyCarriers() {
  const { category } = useParams<{ category: string}>();

  const [data, setData] = useState<{
    name:string,
    colorByPoint:boolean,
    data: { name: string; y: number; }[]
  }>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/energy/carriers/${category}`);
      const tempData: {name: string, colorByPoint:boolean, data: { name: string; y: number; }[]} = { name: 'Energibærer', colorByPoint: true, data: [] };
      for (let i = 0; i < result.data.length; i += 1) {
        tempData.data.push({ name: result.data[i].name, y: result.data[i].amount });
      }
      tempData.data.sort((a, b) => ((a.name > b.name) ? 1 : -1));
      setData(tempData);
    };
    setHeight(document.getElementsByClassName(style.energyCarriers)[0].clientHeight);
    fetchData();
  }, [category]);

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
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
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
