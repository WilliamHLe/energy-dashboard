import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

require('highcharts/modules/sankey')(Highcharts);

function Sankey() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/energy/carriers');
      const tempData:any[] = [{
        keys: ['from', 'to', 'weight'],
        data: [],
        type: 'sankey',
        name: 'Energibærer',
      }];
      for (let i = 0; i < result.data.length; i += 1) {
        for (let j = 0; j < result.data[i].carriers.length; j += 1) {
          tempData[0].data.push([
            result.data[i].carriers[j].name,
            result.data[i].category.name,
            result.data[i].carriers[j].amount,
          ]);
        }
      }
      // Sortering etter bærernavn
      tempData[0].data.sort((a: string[], b: any[]) => a[0].localeCompare(b[0]));
      // Sortering etter bærerverdi
      // tempData[0].data.sort((a: number[], b: number[]) => b[2] - a[2]);
      // Sortering etter byggnavn
      tempData[0].data.sort((a: string[], b: any[]) => a[1].localeCompare(b[1]));
      setData(tempData);
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      backgroundColor: null,
      color: 'white',
    },
    colors: ['#CECE00', '#FEB064', '#00ffff', '#28d515',
      '#B5CA92',
      '#FEB064', '#92A8CD', '#A47D7C', '#F7A4F7'],
    title: {
      text: 'Energibærere',
      style: {
        color: 'white',
      },
    },
    plotOptions: {
      sankey: {
        dataLabels: {
          color: 'white',
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: data,
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default Sankey;
