import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
// ss
function AverageUsage() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const mockData = [{
      name: 'Blomsterbyen barnehage',
      data: [32000],
      tooltip: {
        valueSuffix: ' km/h',
      },
      dial: {
        radius: '100%',
        baseWidth: 1,
        rearLength: '20%',
      },
      dataLabels: {
        format: `<div style="text-align:center"><span style="font-size:17px;color:${
          (Highcharts.theme) || 'silver'}">{y}</span><br/>`
            + '<span style="font-size:17px;color:silver">km/h</span></div>',
      },
      showInLegend: true,
    },
    {
      name: 'Gjennomsnitt',
      data: [29000],
      type: 'gauge',
      dial: {
        baseLength: '100%',
        radius: '110%',
        rearLength: '-45%',
      },
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    }];
    setData(mockData);
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
      title: {
        y: -80,
        text: 'Speed',
      },
      labels: {
        y: 16,
      },
      min: 0,
      max: 100000,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
      series: {
        style: {
          color: 'white',
        },
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
    },
    legend: {
      verticalAlign: 'middle',
      y: 100,
      layout: 'vertical',
      itemStyle: {
        color: 'white',
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
      enabled: false,
    },
    series: data,
  };
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default AverageUsage;
