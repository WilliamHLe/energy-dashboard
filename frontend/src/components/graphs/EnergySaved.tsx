import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/sankey')(Highcharts);

function EnergySaved() {
  const startYear = 2020;
  const endYear = 2021;
  const [datas, setData] = useState<{ name: string; y: number; }[]>();

  useEffect(() => {
    const buildings = ['Skoler', 'Barnehager', 'Sykehjem', 'Idrettshaller', 'Andre bygg'];
    const savings = [3.5, 0.75, 3.0, -0.4, 1.75];
    const tempDatas: { name: string; y: number; }[] = [];
    for (let i = 0; i < buildings.length; i += 1) {
      tempDatas.push({ name: buildings[i], y: savings[i] });
    }
    setData(tempDatas);
  }, []);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: null,
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
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    title: {
      text: `Energi spart fra ${startYear} til ${endYear}`,
      style: {
        color: 'white',
      },
    },
    credits: {
      enabled: false,
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
    xAxis: {
      type: 'category',
      labels: {
        style: {
          color: 'white',
        },
      },
    },
    legend: {
      itemStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: 'Bygg',
        data: datas,
        showInLegend: false,
      },

    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default EnergySaved;
