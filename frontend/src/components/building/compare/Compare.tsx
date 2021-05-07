import React, { useEffect, useState } from 'react';
import Card from './ComapreWithListCard';
import style from './compare.module.css';
import { getBuildings } from '../../../services/buildingsService';
import { IBuildingsData } from '../../../types/interfaces';

/* interface Ibuilding {
  name: string,
  tek: string,
  area: number,
  year: number,
  energyLabel: string,
  category: {
    id: string,
    name: string,
  }
} */

function Compare(props: { currentBuilding: IBuildingsData, onChange: any }) {
  const { currentBuilding } = props;
  const [initalBuildings, setInitialBuildings] = useState<IBuildingsData[]>();
  const [buildings, setBuildings] = useState<IBuildingsData[]>();
  const [checkedItems, setCheckedItems] = useState([
    {
      name: 'Energimerke',
      label: 'energimerke',
      checked: false,
    },
    {
      name: 'Tekstandard',
      label: 'tek',
      checked: false,
    },
  ]);

  const fetchCurrentBuildingData = async () => {
    // Creates random tek-standard and energy label for the building
    // For demonstration purposes as the dataset lacks this information
    const teksatandard = ['TEK17', 'TEK18', 'TEK16'];
    const energimerke = ['A', 'B', 'C', 'D'];
    const o = Math.floor(Math.random() * 2);
    const u = Math.floor(Math.random() * 3);
    currentBuilding.tek = teksatandard[o];
    currentBuilding.energyLabel = energimerke[u];
    const allBuildings: IBuildingsData[] = await getBuildings(`?category=${currentBuilding.category}`);
    // Creates random tek-standard and energy label for all buildings within the category
    // For demonstration purposes as the dataset lacks this information
    for (let i = 0; i < allBuildings.length; i += 1) {
      const k = Math.floor(Math.random() * 2);
      const l = Math.floor(Math.random() * 3);
      allBuildings[i].tek = teksatandard[k];
      allBuildings[i].energyLabel = energimerke[l];
    }
    if (allBuildings.length > 0) {
      const initialFilterd = allBuildings.filter((i: IBuildingsData) => (
        // eslint-disable-next-line max-len
        (currentBuilding.year && i.year ? (i.year <= currentBuilding.year + 50
              && i.year >= currentBuilding.year - 50) : i.year)
          && (currentBuilding.area && i.area ? (i.area <= currentBuilding.area + 500
          && i.area >= currentBuilding.area - 500) : i.area)
          && (i.name !== currentBuilding.name)));
      setBuildings(initialFilterd);
      setInitialBuildings(initialFilterd);
    }
  };

  useEffect(() => {
    fetchCurrentBuildingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = (index: number, list: IBuildingsData[] | undefined) => {
    const item = checkedItems[index];
    if (item.label === 'energimerke' && currentBuilding !== undefined && list !== undefined) {
      return list.filter((i) => (
        i.energyLabel === currentBuilding.energyLabel));
    }
    if (item.label === 'tek' && currentBuilding !== undefined && list !== undefined) {
      return list.filter((i) => i.tek === currentBuilding.tek);
    }
    return undefined;
  };

  const removeFilter = () => {
    let index = 0;
    let countFilter = 0;
    checkedItems.forEach(() => {
      if (checkedItems[index].checked) {
        setBuildings(filter(index, initalBuildings));
        countFilter += 1;
      }
      index += 1;
    });
    if (countFilter === 0) {
      setBuildings(initalBuildings);
    }
  };

  const openModal = (compareBuilding: IBuildingsData) => {
    props.onChange(compareBuilding);
  };

  // set checked for specified checkbox to true/ false
  const setCheckboxes = (index: number) => () => {
    const bool = checkedItems[index].checked;
    const newArr = [...checkedItems];
    newArr[index].checked = !(bool);
    setCheckedItems(newArr);
    if (!checkedItems[index].checked) {
      removeFilter();
    }
    if (checkedItems[index].checked) {
      setBuildings(filter(index, buildings));
    }
  };

  return (
    <div className={`container ${style.wrapper}`}>
      <h2 className={style.title}>Sammenlign deg med andre lignende bygg </h2>
      <div className={style.checkboxWrapper}>
        {checkedItems.map((item, index) => (
          <div className={style.checkboxes}>
            <label htmlFor={item.name}>
              <p className={style.checkboxes}>
                {item.name}
              </p>
              <input id={item.name} type="checkbox" checked={item.checked} onChange={setCheckboxes(index)} className={style.checkboxes} />
            </label>
          </div>
        ))}
      </div>
      <div className={style.buildingList}>
        {buildings?.map((building: IBuildingsData) => (
          // eslint-disable-next-line
          <a onClick={() => openModal(building)}>
            <Card buildingName={building.name} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Compare;
