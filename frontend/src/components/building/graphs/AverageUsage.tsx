import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router';
import style from '../building.module.css';
import { getEnergyAverage } from '../../../services/energyService';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

interface IDial {
  radius:string,
  baseWidth: number,
  rearLength: string
}

interface IDataLabels {
  format: string
}

interface IAverage {
  name: string,
  type?: string,
  data?: number[],
  dial?: IDial,
  dataLabels?: IDataLabels,
  showInLegend: boolean,
}

/**
 * Creates a gauge chart that compares a buildings average usage to the building category
 */
function AverageUsage() {
  const { category, id } = useParams<{category:string, id:string}>();

  const [data, setData] = useState<IAverage[]>();
  const [categoryAvg, setCategoryAvg] = useState<{name: string, average: number}>({ name: 'initial', average: 10000 });
  useEffect(() => {
    const fetchData = async () => {
      const resultBuilding = await getEnergyAverage(`${id}`);
      const resultCategory = await getEnergyAverage(`${category}`);
      setCategoryAvg({ name: category, average: resultCategory.averageEnergy[0].average });
      const tempData: IAverage[] = [{
        name: id,
        data: [resultBuilding.averageEnergy],
        dial: {
          radius: '100%',
          baseWidth: 1,
          rearLength: '20%',
        },
        dataLabels: {
          format: `<div class=${style.gauge}><span style="font-size:17px;color: #28d515">{y}</span><span style="font-size:17px;color:#28d515"> KWh</span></div>`,
        },
        showInLegend: true,
      },
      {
        name: category,
        type: 'solidgauge',
        showInLegend: true,
      }];
      setData(tempData);
    };
    fetchData();
  }, [category, id]);
  // Options for Highcharts
  const options = {
    chart: {
      type: 'solidgauge',
      backgroundColor: null,
    },
    credits: {
      enabled: false,
    },
    colors: ['#28d515',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    legend: {
      verticalAlign: 'middle',
      layout: 'vertical',
      y: 80,
      itemStyle: {
        color: 'white',
      },
      itemHoverStyle: {
        color: 'white',
      },
    },
    pane: {
      center: ['50%', '55%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: 'lightgrey',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
      series: {
        style: {
          color: 'white',
        },
        events: {
          legendItemClick: () => false,
        },
        allowPointSelect: false,
      },
      tooltip: {
        format: '{y} KWh',
      },
      solidgauge: {
        colorByPoint: false,
        dataLabels: {
          y: -20,
          borderWidth: 0,
          useHTML: true,
          color: 'white',
          format: '{y} KWh',
        },
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            enabled: false,
          },
        },
        allowPointSelect: false,
      },
    },
    series: data,
    title: {
      text: 'Gjennomsnittlig energiforbruk',
      style: {
        color: 'white',
      },
    },
    tooltip: {
      enabled: true,
    },
    xAxis: {
      labels: {
        style: {
          color: 'white',
        },
      },
    },
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
      max: (categoryAvg.average * 2),
      plotBands: [{
        from: categoryAvg.average,
        to: categoryAvg.average + ((categoryAvg.average * 3) / 100),
        thickness: '50%',
        outerRadius: '105%',
        color: '#FEB064',
        zIndex: 5,
        label: {
          useHTML: true,
          text: `<span style="background-color: #FEB064;border-radius: 5px;border:1px solid white; padding:2px;">${categoryAvg.name}: ${categoryAvg.average} KWh</span>`,
        },
      }],
    },
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
