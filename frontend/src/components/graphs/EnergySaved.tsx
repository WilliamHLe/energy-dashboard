import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/sankey')(Highcharts);

function EnergySaved() {
  const [data, setData] = useState<{ name: string; y: number; }[]>();
  const [currentYear, setCurrentYear] = useState(0);
  const [lastYear, setLastYear] = useState(0);

  useEffect(() => {
    const tempData = [];
    const today = new Date();
    const year = today.getFullYear();
    const currentDate = `${(`0${today.getDate()}`).slice(-2)}-${(`0${today.getMonth() + 1}`).slice(-2)}-${year.toString().slice(-2)}`;
    const lastDate = `${(`0${today.getDate()}`).slice(-2)}-${(`0${today.getMonth() + 1}`).slice(-2)}-${(year - 1).toString().slice(-2)}`;
    // Fetches:
    //  This year: /energy/total?from_date=01-01-year.toString().slice(-2)&to_date=currentDates
    //  Last year: /energy/total?from_date=01-01-(year - 1).toString().slice(-2)&to_date=lastDate
    console.log(currentDate, lastDate);
    const mockThisYear = [
      {
        category: {
          id: '213123',
          name: 'Skole',
        },
        total: 31631,
      },
      {
        category: {
          id: '213123',
          name: 'Barnehage',
        },
        total: 31931,
      },
      {
        category: {
          id: '213123',
          name: 'Idrettsbygg',
        },
        total: 31031,
      },
      {
        category: {
          id: '213123',
          name: 'Sykehjem',
        },
        total: 30731,
      },
      {
        category: {
          id: '213123',
          name: 'Andre bygg',
        },
        total: 32231,
      },
    ];
    const mockLastYear = [
      {
        category: {
          id: '213123',
          name: 'Skole',
        },
        total: 31231,
      },
      {
        category: {
          id: '213123',
          name: 'Barnehage',
        },
        total: 31231,
      },
      {
        category: {
          id: '213123',
          name: 'Idrettsbygg',
        },
        total: 31231,
      },
      {
        category: {
          id: '213123',
          name: 'Sykehjem',
        },
        total: 31231,
      },
      {
        category: {
          id: '213123',
          name: 'Andre bygg',
        },
        total: 31231,
      },
    ];
    for (let i = 0; i < mockLastYear.length; i += 1) {
      if (mockLastYear[i].category.name === mockThisYear[i].category.name) {
        const saving = (
          (mockLastYear[i].total - mockThisYear[i].total) / mockThisYear[i].total
        ) * 100;
        console.log(mockThisYear[i].total);
        tempData.push({ name: mockThisYear[i].category.name, y: parseFloat(saving.toFixed(2)) });
      }
    }
    setData(tempData);
    setCurrentYear(year);
    setLastYear(year - 1);
  }, []);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%',
          color: 'white',
        },
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    title: {
      text: `Energi spart fra ${lastYear} til ${currentYear}`,
      style: {
        color: 'white',
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      valueSuffix: '%',
    },
    yAxis: {
      title: {
        text: 'Prosent ',
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
    xAxis: {
      type: 'category',
      labels: {
        style: {
          color: 'white',
        },
      },
    },
    series: [
      {
        name: 'Bygg',
        data,
        showInLegend: false,
      },

    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default EnergySaved;
