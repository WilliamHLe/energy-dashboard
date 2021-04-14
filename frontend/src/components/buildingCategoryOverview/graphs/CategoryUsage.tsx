import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const axios = require('axios').default;
require('highcharts/modules/boost')(Highcharts);

function CategoryUsage() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchData = async () => {
      const response = await axios.get('/energy/usage');
      const tempData:any[] = [];
      try {
        const years: number[] = [];
        for (let i = 0; i < response.data.length; i += 1) {
          tempData.push({ name: response.data[i].category.name, data: [] });
          for (let j = 0; j < response.data[i].total.length; j += 1) {
            const date = new Date(response.data[i].total[j].date);
            if (!years.includes(date.getFullYear())) {
              years.push(date.getFullYear());
              const year = date.getFullYear();
              const button = {
                year: {
                  text: year,
                  onclick: function () {
                    // @ts-ignore
                    // eslint-disable-next-line react/no-this-in-sfc
                    this.xAxis[0].setExtremes(
                      Date.UTC(date.getFullYear(), 0, 0),
                      Date.UTC(date.getFullYear() + 1, 0, 0),
                    );
                  },
                },
              };
              console.log(button);
            }
            tempData[i].data.push({
              x: date,
              y: response.data[i].total[j].value,
            });
          }
        }
        setData(tempData);
        console.log(years);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const options = {
    chart: {
      type: 'line',
      backgroundColor: null,
    },
    loading: {
      labelStyle: {
        fontStyle: 'italic',
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
    colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
      '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
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
        pointInterval: 86400000,
        pointStart: 1282408923000,
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
