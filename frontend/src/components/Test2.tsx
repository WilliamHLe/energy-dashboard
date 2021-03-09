import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Test2(props:any) {
  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'My chart',
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
        Dette er ikke en
        {' '}
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.bygg}
        .
      </p>
      <div><HighchartsReact highcharts={Highcharts} options={options} /></div>
    </div>
  );
}

export default Test2;
