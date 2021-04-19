import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

require('highcharts/modules/sankey')(Highcharts);

function EnergySaved() {
  const [data, setData] = useState<{ name: string; y: number; }[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/energy/saved');
        const tempData = [];
        for (let i = 0; i < result.data.length; i += 1) {
          tempData.push({
            name: result.data[i].category.name,
            y: parseFloat(result.data[i].saved.toFixed(2)),
          });
        }
        setData(tempData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    colors: ['#8AD515', '#00FFFF', '#FEB064', '#CECE00', '#F7A4F7',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
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
      text: 'Energi spart siden i fjor',
      style: {
        color: 'white',
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      valueSuffix: '%',
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
    series: [
      {
        name: 'Bygg',
        data,
        showInLegend: false,
      },

    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default EnergySaved;
