import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router';

const axios = require('axios').default;
require('highcharts/modules/boost')(Highcharts);

function CategoryUsage() {
  const { category, id } = useParams<{category:string, id:string}>();
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchData = async () => {
      let query = '';
      if (id !== undefined) {
        query = `${id}`;
      } else if (category !== undefined) {
        query = `${category}`;
      }
      try {
        const response = await axios.get(`/energy/usage/${query}`);
        const tempData:any[] = [];
        if (query !== '') {
          tempData.push({ cropThreshold: 9999, name: query, data: [] });
        }
        for (let i = 0; i < response.data.length; i += 1) {
          if (query === '') {
            tempData.push({ cropThreshold: 9999, name: response.data[i].category.name, data: [] });
            for (let j = 0; j < response.data[i].usage.length; j += 1) {
              const date = new Date(response.data[i].usage[j].date).getTime();
              tempData[i].data.push({
                x: date,
                y: response.data[i].usage[j].value,
              });
            }
          } else {
            const date = new Date(response.data[i].date).getTime();
            tempData[0].data.push({
              x: date,
              y: response.data[i].value,
            });
          }
        }
        setData(tempData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [category, id]);
  const options = {
    chart: {
      type: 'line',
      backgroundColor: null,
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    loading: {
      labelStyle: {
        fontStyle: 'italic',
      },
    },
    rangeSelector: {
      allButtonsEnabled: true,
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
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key:%Y-%m-%d}</span><br/>',
    },
    title: {
      text: 'Forbruk fordelt på ulike byggkategorier',
      style: {
        color: 'white',
      },
    },
    boost: {
      useGPUTranslations: true,
    },
    colors: ['#28d515', '#00FFFF', '#FEB064', '#CECE00', '#F7A4F7',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    credits: {
      enabled: false,
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
    plotOptions: {
      line: {
        pointInterval: 86400000,
        pointStart: 1282408923000,
      },
      column: {
        colorByPoint: true,
      },
      series: {
        style: {
          color: 'white',
        },
        turboThreshold: 0,
      },
    },
    legend: {
      enabled: true,
      itemStyle: {
        color: 'white',
      },
    },
    navigator: {
      enabled: true,
      height: 20,
    },
    scrollbar: {
      enabled: false,
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
    series: data,
  };
  return (
    <HighchartsReact constructorType="stockChart" highcharts={Highcharts} options={options} />
  );
}

export default CategoryUsage;
