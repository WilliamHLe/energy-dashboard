import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import style from './building.module.css';
import CategoryUsage from '../buildingCategoryOverview/graphs/CategoryUsage';
import AverageUsage from './graphs/AverageUsage';
import Compare from './compare/Compare';
import HeatMapChart from './heatmap/HeatmapChart';
import Modal from './compare/Modal/Modal';
import EnergySaved from './graphs/EnergySaved';
import b1 from './icons/1.svg';
import b2 from './icons/2.svg';
import b3 from './icons/3.svg';
// s
function Building() {
  interface Ibuilding {
    name: string,
    tek: string,
    area: number,
    year: number,
    energyLabel: string,
    category: {
      id: string,
      name: string,
    }
  }
  // ss
  const { id } = useParams<{ category: string, id: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [compareWithBuilding, setcompareWithBuilding] = useState<Ibuilding>();
  const [currentBuilding, setCurrentBuilding] = useState<Ibuilding>();
  useEffect(() => {
    const fetchCurrentBuildingData = async () => {
      const responseBuilding = await axios.get(`/search?name=${id}`);
      console.log(responseBuilding.data[0]);
      setCurrentBuilding(responseBuilding.data[0]);
    };
    fetchCurrentBuildingData();
  }, [id]);

  const openModal = (building: Ibuilding) => {
    setModalIsOpen(!modalIsOpen);
    setcompareWithBuilding(building);
  };
  console.log(currentBuilding);
  return (
    <div>
      <div>
        <div className={style.building} style={{ opacity: modalIsOpen ? 0.1 : 1.0 }}>
          <div className={`container ${style.energyUsageGraph}`}>
            <CategoryUsage />
          </div>
          <div className={`container ${style.compareBuildings}`}>
            {currentBuilding ? (
              <Compare currentBuilding={currentBuilding} onChange={openModal} />
            ) : <div />}
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
            <table style={{ margin: 'auto' }}>
              <tr>
                <td><img alt="Badge" src={b1} /></td>
                <td><img alt="Badge" src={b1} /></td>
                <td><img alt="Badge" src={b1} /></td>
                <td><img alt="Badge" src={b3} /></td>
              </tr>
              <tr>
                <td><img alt="Badge" src={b2} /></td>
                <td><img alt="Badge" src={b2} /></td>
                <td><img alt="Badge" src={b2} /></td>
                <td><img alt="Badge" src={b2} /></td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          {modalIsOpen === true ? (
          // eslint-disable-next-line max-len
            <Modal currentBuilding={currentBuilding} compareBuilding={compareWithBuilding} onChange={openModal} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Building;
