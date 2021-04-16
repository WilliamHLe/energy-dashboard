import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function CategoryUsage(props: {sendBuilding: any, sendCompareBuilding: any}) {
  const { sendBuilding, sendCompareBuilding } = props;
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const mockData = [
      {
        category: {
          id: '4edd40c86762e0fb12000003',
          name: sendBuilding,
        },
        usage: [
          {
            date: '25.01.20',
            value: 234,
          },
          {
            date: '26.01.20',
            value: 300,
          },
          {
            date: '27.01.20',
            value: 218,
          },
          {
            date: '25.02.20',
            value: 234,
          },
          {
            date: '26.02.20',
            value: 300,
          },
          {
            date: '27.02.20',
            value: 218,
          },
          {
            date: '25.03.20',
            value: 234,
          },
          {
            date: '26.03.20',
            value: 300,
          },
          {
            date: '27.03.20',
            value: 218,
          },
          {
            date: '25.04.20',
            value: 234,
          },
          {
            date: '26.04.20',
            value: 300,
          },
          {
            date: '27.04.20',
            value: 218,
          },
          {
            date: '25.05.20',
            value: 234,
          },
          {
            date: '26.05.20',
            value: 300,
          },
          {
            date: '27.05.20',
            value: 218,
          },
          {
            date: '25.06.20',
            value: 234,
          },
          {
            date: '26.06.20',
            value: 300,
          },
          {
            date: '27.06.20',
            value: 218,
          },
          {
            date: '25.07.20',
            value: 234,
          },
          {
            date: '26.07.20',
            value: 300,
          },
          {
            date: '27.07.20',
            value: 218,
          },
          {
            date: '25.08.20',
            value: 234,
          },
          {
            date: '26.08.20',
            value: 300,
          },
          {
            date: '27.08.20',
            value: 218,
          },
          {
            date: '25.09.20',
            value: 234,
          },
          {
            date: '26.09.20',
            value: 300,
          },
          {
            date: '27.09.20',
            value: 218,
          },
          {
            date: '25.10.20',
            value: 234,
          },
          {
            date: '26.10.20',
            value: 300,
          },
          {
            date: '27.10.20',
            value: 218,
          },
          {
            date: '25.11.20',
            value: 234,
          },
          {
            date: '26.11.20',
            value: 300,
          },
          {
            date: '27.11.20',
            value: 218,
          },
          {
            date: '25.12.20',
            value: 234,
          },
          {
            date: '26.12.20',
            value: 300,
          },
          {
            date: '27.12.20',
            value: 218,
          },
          {
            date: '25.01.21',
            value: 234,
          },
          {
            date: '26.01.21',
            value: 300,
          },
          {
            date: '27.01.21',
            value: 218,
          },
          {
            date: '25.02.21',
            value: 234,
          },
          {
            date: '26.02.21',
            value: 300,
          },
          {
            date: '27.02.21',
            value: 218,
          },
          {
            date: '25.03.21',
            value: 234,
          },
          {
            date: '26.03.21',
            value: 300,
          },
          {
            date: '27.03.21',
            value: 218,
          },
        ],
      },
      {
        category: {
          id: '4edd40c86762e0fb12000003',
          name: sendCompareBuilding,
        },
        usage: [
          {
            date: '25.01.20',
            value: 174,
          },
          {
            date: '26.01.20',
            value: 200,
          },
          {
            date: '27.01.20',
            value: 318,
          },
          {
            date: '25.02.20',
            value: 334,
          },
          {
            date: '26.02.20',
            value: 200,
          },
          {
            date: '27.02.20',
            value: 318,
          },
          {
            date: '25.03.20',
            value: 334,
          },
          {
            date: '26.03.20',
            value: 200,
          },
          {
            date: '27.03.20',
            value: 118,
          },
          {
            date: '25.04.20',
            value: 134,
          },
          {
            date: '26.04.20',
            value: 140,
          },
          {
            date: '27.04.20',
            value: 118,
          },
          {
            date: '25.05.20',
            value: 114,
          },
          {
            date: '26.05.20',
            value: 200,
          },
          {
            date: '27.05.20',
            value: 178,
          },
          {
            date: '25.06.20',
            value: 314,
          },
          {
            date: '26.06.20',
            value: 200,
          },
          {
            date: '27.06.20',
            value: 318,
          },
          {
            date: '25.07.20',
            value: 134,
          },
          {
            date: '26.07.20',
            value: 160,
          },
          {
            date: '27.07.20',
            value: 318,
          },
          {
            date: '25.08.20',
            value: 334,
          },
          {
            date: '26.08.20',
            value: 230,
          },
          {
            date: '27.08.20',
            value: 288,
          },
          {
            date: '25.09.20',
            value: 294,
          },
          {
            date: '26.09.20',
            value: 200,
          },
          {
            date: '27.09.20',
            value: 148,
          },
          {
            date: '25.10.20',
            value: 144,
          },
          {
            date: '26.10.20',
            value: 350,
          },
          {
            date: '27.10.20',
            value: 198,
          },
          {
            date: '25.11.20',
            value: 204,
          },
          {
            date: '26.11.20',
            value: 200,
          },
          {
            date: '27.11.20',
            value: 318,
          },
          {
            date: '25.12.20',
            value: 164,
          },
          {
            date: '26.12.20',
            value: 290,
          },
          {
            date: '27.12.20',
            value: 288,
          },
          {
            date: '25.01.21',
            value: 214,
          },
          {
            date: '26.01.21',
            value: 300,
          },
          {
            date: '27.01.21',
            value: 218,
          },
          {
            date: '25.02.21',
            value: 234,
          },
          {
            date: '26.02.21',
            value: 400,
          },
          {
            date: '27.02.21',
            value: 200,
          },
          {
            date: '25.03.21',
            value: 334,
          },
          {
            date: '26.03.21',
            value: 360,
          },
          {
            date: '27.03.21',
            value: 298,
          },
        ],
      },
    ];
    const tempData:any[] = [];
    try {
      for (let i = 0; i < mockData.length; i += 1) {
        tempData.push({ name: mockData[i].category.name, data: [] });
        for (let j = 0; j < mockData[i].usage.length; j += 1) {
          const date = new Date(mockData[i].usage[j].date.replace(/(\d{2}).(\d{2}).(\d{2})/, '$2/$1/$3')).getTime();
          tempData[i].data.push({ x: date, y: mockData[i].usage[j].value });
        }
      }
      setData(tempData);
    } catch (e) {
      console.log(e);
    }
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
    series: data,
  };
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default CategoryUsage;
