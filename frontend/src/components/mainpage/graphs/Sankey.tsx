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
      setData(tempData);
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      backgroundColor: null,
      color: 'white',
    },
    title: {
      text: 'Energibærere',
      style: {
        color: 'white',
      },
    },
    dataLabels: {

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
