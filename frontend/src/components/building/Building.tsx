import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './building.module.css';
import EnergyUsage from '../buildingCategoryOverview/graphs/EnergyUsage';
import AverageUsage from './graphs/AverageUsage';
import Compare from './compare/Compare';
import HeatMapChart from './heatmap/HeatmapChart';
import Modal from './compare/Modal/Modal';
import EnergySaved from './graphs/EnergySaved';
import { getSpecificBuilding } from '../../services/buildingsService';
import b1 from './icons/1.svg';
import b2 from './icons/2.svg';
import b3 from './icons/3.svg';
import { getEnergyUsage } from '../../services/energyService';

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
  const { id } = useParams<{ category: string, id: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [compareWithBuilding, setcompareWithBuilding] = useState<Ibuilding>();
  const [currentBuilding, setCurrentBuilding] = useState<Ibuilding>();
  const [data, setData] = useState<{ name: string, data: { x: number, y: number }[] }[]>([]);
  useEffect(() => {
    const fetchCurrentBuildingData = async () => {
      setData(await getEnergyUsage(undefined, id));
      setCurrentBuilding(await getSpecificBuilding(id));
    };
    fetchCurrentBuildingData();
  }, [id]);

  const openModal = (building: Ibuilding) => {
    setModalIsOpen(!modalIsOpen);
    setcompareWithBuilding(building);
  };
  return (
    <div>
      <div>
        <div className={style.building} style={{ opacity: modalIsOpen ? 0.1 : 1.0 }}>
          <div className={`container ${style.energyUsageGraph}`}>
            <EnergyUsage data={data} height={null} />
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
            <Modal
              currentBuilding={currentBuilding}
              compareBuilding={compareWithBuilding}
              onChange={openModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Building;
