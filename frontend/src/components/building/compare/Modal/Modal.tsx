import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './modal.module.css';
import CategoryUsage from './graphs/CategoryUsage';
import closeImage from '../../../../assets/png/close.png';
import ProgressBar from './graphs/ProgressBar';
import check from '../../../../assets/png/bi_check.png';
import cross from '../../../../assets/png/entypo_cross.png';
// s
interface Ibuilding {
  name: string,
  tek: string,
  areal: number,
  year: number,
  energimerke: string,
}

function Modal(props: { onChange: any, compareBuilding: Ibuilding | undefined }) {
  const { id } = useParams<{ id: string }>();
  const { compareBuilding } = props;
  const [isLoading, setLoading] = useState(true);
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
  const [allUpgrades, setUpgrades] = useState(['']);
  const [currentBuildingUpgrade, setCrurrentBuildingUpgrades] = useState([3]);
  const [otherBuildingUpgrade, setOtherBuildingUpgrades] = useState([3]);

  const closeModal = () => {
    props.onChange();
  };

  const getIcon = (building: number[], index: number) => {
    if (currentBuildingUpgrade[index] === 0 && otherBuildingUpgrade[index] === 0) {
      return (<input type="image" alt="check" src={check} />);
    }
    if (building[index] === 1) {
      return (<input type="image" alt="check" src={check} />);
    }
    return (<input type="image" alt="check" src={cross} />);
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

  useEffect(() => {
    randomUpgrade();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div id={style.wrapper}>
          <input type="image" onClick={closeModal} alt="close" src={closeImage} className={style.closeImage} />
          <h1>
            Sammenlign
            {' '}
            {id}
            {' '}
            og
            {' '}
            {compareBuilding}
            {' '}
          </h1>
          <div id={style.compareUsage}>
            <CategoryUsage sendBuilding={id} sendCompareBuilding={compareBuilding} />
          </div>
          <div className={style.gridConatiner}>
            {' '}
            <div className={style.colum2}>
              <h2 className={style.row1}>
                {' '}
                {id}
                {' '}
              </h2>
              <p className={style.row2}>
                {' '}
                Byggeår: 2012
                {'   '}
                km²: 1049
              </p>
              <div className={style.row3}>
                <ProgressBar building={id} place="left" data="avg" />
              </div>
              <div className={style.row4}>
                <ProgressBar building={id} place="left" data="spart" />
              </div>
              <div className={style.iconL}>
                {allUpgrades.map((_upgrade, index) => getIcon(currentBuildingUpgrade, index))}
              </div>
            </div>
            <div className={style.colum3}>
              <p className={style.row3}> Gjennomsnittlig energiforbruk </p>
              <p className={style.row4}> Spart Sammenlignet med i fjor </p>
              <div className={style.row5}>
                {allUpgrades.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            </div>
            <div className={style.colum4}>
              <h2>
                {' '}
                {compareBuilding}
                {' '}
              </h2>
              <p className={style.row2}>
                {' '}
                Byggeår:

                2005
                {'   '}
                km²:

                1264
              </p>
              <div className={style.row3}>
                <ProgressBar building={compareBuilding} place="right" data="avg" />
              </div>
              <div className={style.row4}>
                <ProgressBar building={compareBuilding} place="right" data="spart" />
              </div>
              <div className={style.iconR}>
                {allUpgrades.map((_upgrade, index) => getIcon(otherBuildingUpgrade, index))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
