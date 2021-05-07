import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router';
import style from '../category.module.css';
import { getEnergyCarriersCategory } from '../../../services/energyService';
import { ICarriersCategoryReturn } from '../../../types/interfaces';

/**
 * Creates a pie chart for the energy carriers of the current building category
 */
function EnergyCarriers() {
  const { category } = useParams<{category: string}>();

  const [data, setData] = useState<ICarriersCategoryReturn>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getEnergyCarriersCategory(category));
    };
    // Manually sets the height of the graph
    // Necessary as the graph would stretch beyond the parent div otherwise
    setHeight(document.getElementsByClassName(style.energyCarriers)[0].clientHeight);
    fetchData();
  }, [category]);
  // Options for highcharts
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height,
    },
    colors: ['#28d515', '#00FFFF', '#FEB064', '#F7A4F7', '#CECE00',
      '#FEB064', '#92A8CD', '#A47D7C', '#B5CA92'],
    credits: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: 'white',
      },
      itemHoverStyle: {
        color: 'grey',
      },
      labelFormat: '{name} ({percentage:.1f}%)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
      },
      series: {
        style: {
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

export default EnergyCarriers;
