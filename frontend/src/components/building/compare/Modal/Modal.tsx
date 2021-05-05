import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './modal.module.css';
import EnergyUsage from '../../../buildingCategoryOverview/graphs/EnergyUsage';
import closeImage from '../../../../assets/png/close.png';
import ProgressBar from './graphs/ProgressBar';
import check from '../../../../assets/png/bi_check.png';
import cross from '../../../../assets/png/entypo_cross.png';
import { getEnergyUsage } from '../../../../services/energyService';

interface Ibuilding {
  name: string,
  tek: string,
  area: number,
  year: number,
  energyLabel: string,
}
function Modal(props: {
  onChange: any,
  currentBuilding: Ibuilding | undefined,
  compareBuilding: Ibuilding | undefined }) {
  const { id } = useParams<{ id: string }>();
  const { currentBuilding, compareBuilding } = props;
  const [isLoading, setLoading] = useState(true);
  const [allUpgrades, setUpgrades] = useState(['']);
  const [currentBuildingUpgrade, setCrurrentBuildingUpgrades] = useState([3]);
  const [otherBuildingUpgrade, setOtherBuildingUpgrades] = useState([3]);
  const [data, setData] = useState<any>([]);

  const closeModal = () => {
    props.onChange();
  };

  const getIcon = (building: number[], index: number) => {
    if (currentBuildingUpgrade[index] === 0 && otherBuildingUpgrade[index] === 0) {
      return (<img alt="check" src={check} width={40} height={40} />);
    }
    if (building[index] === 1) {
      return (<img alt="check" src={check} width={40} height={40} />);
    }
    return (<img alt="check" src={cross} width={40} height={40} />);
  };
  const setIcons = () => {
    const arr = [];
    let i = 0;
    while (i <= 2) {
      i += 1;
      const a = Math.floor(Math.random() * 2);
      arr.push(a);
    }
    return arr;
  };
  useEffect(() => {
    const UpgradeItem = [
      'Varmepumpe',
      'Etterisolasjon',
      'Bytte vindu',
      'Nattsenking',
      'Tetningslister',
      'Varmegjenvinning',
      'Solcelleanlegg',
      'LED-lys',
    ];
    /**
     * Creates random upgrades for the buildings
     * This is for demonstration purposes as we do not have data about upgrades
     */
    const randomUpgrade = () => {
      let i = 0;
      const arr: string[] = [];
      const numb = Math.floor(Math.random() * 3.0);
      while (i <= numb) {
        const rand = Math.floor(Math.random() * 8);
        if (!(arr.includes(UpgradeItem[rand]))) {
          arr.push(UpgradeItem[rand]);
        }
        i += 1;
      }
      setUpgrades(arr);
      setCrurrentBuildingUpgrades(setIcons());
      setOtherBuildingUpgrades(setIcons());
    };
    randomUpgrade();
    const fetchdata = async () => {
      const responseBuilding = await getEnergyUsage(undefined, id);
      const responseCompareBuilding = await getEnergyUsage(undefined, compareBuilding?.name);
      setData([responseBuilding[0], responseCompareBuilding[0]]);
    };
    fetchdata();
    setLoading(false);
  }, [compareBuilding?.name, id]);
  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div id={style.wrapper}>
          <p className={style.closeImage}>
            <input type="image" onClick={closeModal} alt="close" src={closeImage} className={style.closeImage} />
          </p>
          <br />
          <h1>
            Sammenlign
            {' '}
            {id}
            {' '}
            og
            {' '}
            {compareBuilding?.name}
            {' '}
          </h1>
          <div id={style.compareUsage}>
            <EnergyUsage data={data} height="50%" />
          </div>
          <div>
            <table style={{ margin: 'auto', width: '80%' }}>
              <tbody>
                <tr>
                  <td className={style.left}>
                    <h2 className={style.row1}>
                      {' '}
                      {id}
                      {' '}
                    </h2>
                  </td>
                  <td />
                  <td className={style.right}>
                    <h2 className={style.row1}>
                      {' '}
                      {compareBuilding?.name}
                      {' '}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td className={style.left}>
                    <p>
                      {' '}
                      Byggeår:
                      {' '}
                      {currentBuilding?.year}
                      {'   '}
                      km²:
                      {' '}
                      {currentBuilding?.area}
                    </p>
                  </td>
                  <td />
                  <td className={style.right}>
                    <p>
                      {' '}
                      Byggeår:
                      {' '}
                      {compareBuilding?.year}
                      {'   '}
                      km²:
                      {' '}
                      {compareBuilding?.area}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={style.left}>
                    <ProgressBar building={id} place="left" data="avg" />
                  </td>
                  <td className={style.middle}>
                    <p>
                      Gjennomsnittlig energiforbruk
                    </p>
                  </td>
                  <td className={style.right}>
                    <ProgressBar building={compareBuilding?.name} place="right" data="avg" />
                  </td>
                </tr>
                <tr>
                  <td className={style.left}>
                    <ProgressBar building={id} place="left" data="spart" />
                  </td>
                  <td className={style.middle}>
                    <p>
                      Spart Sammenlignet med i fjor
                    </p>
                  </td>
                  <td className={style.right}>
                    <ProgressBar building={compareBuilding?.name} place="right" data="spart" />
                  </td>
                </tr>
                {allUpgrades.map((_upgrade, index) => (
                  <tr>
                    <td>
                      <div style={{ marginLeft: 'auto', width: '40px' }}>
                        {getIcon(currentBuildingUpgrade, index)}
                      </div>
                    </td>
                    <td className={style.middle}>
                      <p>
                        {_upgrade}
                      </p>
                    </td>
                    <td>
                      <div>
                        {getIcon(otherBuildingUpgrade, index)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
