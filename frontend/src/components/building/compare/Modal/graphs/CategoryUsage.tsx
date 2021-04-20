import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

function CategoryUsage(props: {sendBuilding: any, sendCompareBuilding: any}) {
  const { sendBuilding, sendCompareBuilding } = props;
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const mockData: string | any[] = [];
    const fetchdata = async () => {
      const responseBuilding = await axios.get(`/energy/usage/${sendBuilding}`);
      const responseCompareBuildin = await axios.get(`/energy/usage/${sendCompareBuilding}`);
      mockData.push({ name: sendBuilding, data: responseBuilding.data });
      mockData.push({ name: sendCompareBuilding, data: responseCompareBuildin.data });
      try {
        console.log(mockData);
        const tempData:any[] = [];
        for (let i = 0; i < mockData.length; i += 1) {
          tempData.push({ cropThreshold: 9999, name: mockData[i].name, data: [] });
          for (let j = 0; j < mockData[i].data.length; j += 1) {
            const date = new Date(mockData[i].data[j].date).getTime();
            tempData[i].data.push({ x: date, y: mockData[i].data[j].value });
          }
        }
        console.log(tempData);
        setData(tempData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchdata();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    chart: {
      type: 'line',
      backgroundColor: null,
      zoomType: 'x',
      height: 260,
      width: 1000,
    },
    colors: ['#28d515', '#CE32E7', '#FEB064', '#CECE00', '#F7A4F7',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    boost: {
      useGPUTranslations: true,
    },
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key:%Y-%m-%d}</span><br/>',
    },
    title: {
      text: `Strømforbruk ${sendBuilding} vs ${sendCompareBuilding}`,
      style: {
        color: 'white',
      },
    },
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
      column: {
        colorByPoint: true,
        color: '#CE32E7',
      },
      series: {
        style: {
          color: 'white',
        },
        turboThreshold: 0,
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
    },
    legend: {
      itemStyle: {
        color: 'white',
      },
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
    navigator: {
      enabled: true,
      height: 20,
    },
    scrollbar: {
      enabled: false,
    },
    series: data,
  };
  return (
    <HighchartsReact constructorType="stockChart" highcharts={Highcharts} options={options} />
  );
}

export default CategoryUsage;
