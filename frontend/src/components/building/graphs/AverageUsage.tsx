import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useParams } from 'react-router';
import style from '../building.module.css';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

interface label {
  format: string
}

interface solidGauge {
  name: string,
  data: [number],
  dial: {
    radius: string,
    baseWidth: number,
    rearLength: string,
  },
  dataLabels: label,
  showInLegend: boolean,
}

function AverageUsage() {
  const { category, id } = useParams<{category:string, id:string}>();

  const [data, setData] = useState<solidGauge[]>();
  const [categoryAvg, setCategoryAvg] = useState<{name: string, average: number}>({ name: 'initial', average: 10000 });
  useEffect(() => {
    const fetchData = async () => {
      const resultBuilding = await axios.get(`/energy/average/${id}`);
      const resultCategory = await axios.get(`/energy/average/${category}`);
      // setData(resultBuilding.data.averageEnergy[0].average);
      setCategoryAvg({ name: category, average: resultCategory.data.averageEnergy[0].average });
      const tempData:solidGauge[] = [{
        name: id,
        data: [resultBuilding.data.averageEnergy[0].average],
        dial: {
          radius: '100%',
          baseWidth: 1,
          rearLength: '20%',
        },
        dataLabels: {
          format: `<div class=${style.gauge}><span style="font-size:17px;color:${
            (Highcharts.theme) || 'silver'}">{y}</span><span style="font-size:17px;color:silver"> KWh</span></div>`,
        },
        showInLegend: true,
      }];
      console.log(tempData);
      console.log({ name: category, average: resultCategory.data.averageEnergy[0].average });
      setData(tempData);
    };
    fetchData();
  }, [category, id]);
  const options = {
    chart: {
      type: 'solidgauge',
      backgroundColor: null,
    },
    pane: {
      center: ['50%', '55%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },
    title: {
      text: 'Forbruk fordelt på ulike byggkategorier',
      style: {
        color: 'white',
      },
    },
    credits: {
      enabled: false,
    },
    colors: ['#FEB064',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    yAxis: {
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickPixelInterval: 400,
      tickAmount: 2,
      title: null,
      labels: {
        y: 16,
      },
      min: 0,
      max: Math.random() * (
        (categoryAvg.average * 2)
          - (categoryAvg.average + (categoryAvg.average / 3)))
          + (categoryAvg.average + (categoryAvg.average / 3)),
      plotBands: [{
        from: categoryAvg.average,
        to: categoryAvg.average + ((categoryAvg.average * 3) / 100),
        thickness: '50%',
        outerRadius: '105%',
        color: 'black',
        zIndex: 5,
        label: {
          useHTML: true,
          text: `<span style="background-color: #0A374A;border-radius: 5px;border:1px solid black; padding:2px;">${categoryAvg.name}: ${categoryAvg.average} KWh</span>`,
          textAlign: 'center', // s
        },
      }],
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
      series: {
        style: {
          color: 'white',
        },
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
      tooltip: {
        format: '{y} KWh',
      },
      solidgauge: {
        dataLabels: {
          y: -20,
          borderWidth: 0,
          useHTML: true,
          color: 'white',
          format: '{y} KWh',
        },
      },
      gauge: {
        dataLabels: {
          y: -20,
          borderWidth: 0,
          useHTML: true,
          color: 'white',
          format: '{y} KWh',
        },
      },
      legend: {
      },
    },
    legend: {
      enableMouseTracking: false,
      verticalAlign: 'middle',
      y: 100,
      layout: 'vertical',
      itemStyle: {
        color: 'white',
      },
      states: {
        hover: {
          enabled: false,
        },
      },

    },
    xAxis: {
      labels: {
        style: {
          color: 'white',
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    series: data,
  };
  return (
    <>
      {!data || !categoryAvg ? (
        <div />
      ) : <HighchartsReact highcharts={Highcharts} options={options} />}
    </>
  );
}

export default AverageUsage;
