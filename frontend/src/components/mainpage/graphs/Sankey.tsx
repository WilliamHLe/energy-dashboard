import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getEnergyCarriersAll } from '../../../services/energyService';

require('highcharts/modules/sankey')(Highcharts);

/**
 * Creates a sankey diagram for energy carriers
 */
function Sankey() {
  const [data, setData] = useState<{
    data: any[];
    keys: string[];
    name: string;
    type: string
  }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getEnergyCarriersAll());
    };
    fetchData();
  }, []);
  // Options for Highcharts
  const options = {
    chart: {
      backgroundColor: null,
      color: 'white',
    },
    colors: ['#CECE00', '#FEB064', '#00ffff', '#28d515',
      '#B5CA92',
      '#FEB064', '#92A8CD', '#A47D7C', '#F7A4F7'],
    credits: {
      enabled: false,
    },
    plotOptions: {
      sankey: {
        dataLabels: {
          color: 'white',
        },
      },
    },
    series: data,
    title: {
      text: 'Energibærere',
      style: {
        color: 'white',
      },
    },
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default Sankey;
