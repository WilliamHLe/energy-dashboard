import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router';

function Test() {
  const { category } = useParams<{category:string}>();

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'My chart',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Year 1',
        data: [1, 2, 1, 4, 3, 6],
      },
      {
        name: 'Year 2',
        data: [3, 1, 2, 5, 4, 5],
      },
    ],
  };

  return (

    <div>
      <p>
        Dette er en
        {' '}
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {category}
        .
      </p>
      <div><HighchartsReact highcharts={Highcharts} options={options} /></div>
    </div>
  );
}

export default Test;
