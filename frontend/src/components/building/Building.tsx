import React, { useState } from 'react';
import { useParams } from 'react-router';
import style from './building.module.css';
import CategoryUsage from '../buildingCategoryOverview/graphs/CategoryUsage';
import AverageUsage from './graphs/AverageUsage';
import Compare from './compare/Compare';
import HeatMapChart from './heatmap/HeatmapChart';
import Modal from './compare/Modal/Modal';
import EnergySaved from './graphs/EnergySaved';

function Building() {
  interface Ibuilding {
    name: string,
    tek: string,
    areal: number,
    year: number,
    energimerke: string,
  }
  // s
  const { category, id } = useParams<{ category: string, id: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [compareWithBuilding, setcompareWithBuilding] = useState<Ibuilding>();

  const openModal = (building: Ibuilding) => {
    setModalIsOpen(!modalIsOpen);
    setcompareWithBuilding(building);
  };

  return (
    <>
      <div className={style.building} style={{ opacity: modalIsOpen ? 0.1 : 1.0 }}>
        <div className={`container ${style.energyUsageGraph}`}>
          <CategoryUsage />
        </div>
        <div className={`container ${style.compareBuildings}`}>
          <Compare onChange={openModal} />
        </div>
        <div className={`container ${style.previousYears}`}>
          <HeatMapChart />
        </div>
        <div className={`container ${style.energyAverage}`}>
          <AverageUsage />
        </div>
        <div className={`container ${style.energyTotal}`} />
        <div className={`container ${style.getTips}`} />
        <div className={`container ${style.energyPercentageSaved}`}>
          <EnergySaved />
        </div>
        <div className={`container ${style.badges}`}>
          Bygg type:
          {' '}
          {category}
          , ID:
          {' '}
          {id}
        </div>
      </div>
      <div>
        {modalIsOpen === true ? (
          <Modal compareBuilding={compareWithBuilding} onChange={openModal} />
        ) : null}
      </div>
    </>
  );
}

export default Building;
