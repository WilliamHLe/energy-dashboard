import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

function CategoryUsage(props: {sendBuilding: any, sendCompareBuilding: any}) {
  const { sendBuilding, sendCompareBuilding } = props;
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const mockData: string | any[] = [];
    const fetchdata = async () => {
      const response = await axios.get(`/energy/usage/${sendBuilding}`);
      mockData.push(response.data);
    };
    const fetchOtherData = async () => {
      const response = await axios.get(`/energy/usage/${sendCompareBuilding}`);
      mockData.push(response.data);
    };
    fetchdata();
    fetchOtherData();
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
