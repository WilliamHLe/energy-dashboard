import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import style from '../building.module.css';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
// ssd
function AverageUsage() {
  const [data, setData] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  useEffect(() => {
    const mockBuilding = {
      id: '1232131',
      name: 'Blomsterbyen barnehage',
      category: {
        id: '213231',
        name: 'Barnehage',
      },
    };
    const mockAverage = {
      average: 1234567,
      averageCategory: 1204567,
    };
    const tempData = [{
      name: mockBuilding.name,
      data: [mockAverage.average],
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
    }, {
      name: mockBuilding.category.name,
      average: mockAverage.averageCategory,
    }];
    console.log(tempData[0]);
    setData(tempData[0]);
    setCategory(tempData[1]);
  }, []);
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
      max: 2000000,
      plotBands: {
        from: category.average + 150000,
        to: category.average + 170000,
        color: 'black',
        thickness: '50%',
        outerRadius: '105%',
        useHTML: true,
        zIndex: 5,
        label: {
          text: `${category.name}: ${category.average} KWh`,
          style: {
            color: 'white',
          },
          textAlign: 'center',
          y: -10, // s
        },
        styles: {
          color: 'white',
          margin: '50px',
        },
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
    series: [data],
  };
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default AverageUsage;
