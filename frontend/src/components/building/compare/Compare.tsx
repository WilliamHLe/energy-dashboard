import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from './ComapreWithListCard';
import style from './compare.module.css';

interface Ibuilding {
  name: string,
  tek: string,
  areal: number,
  year: number,
  energimerke: string,
}

function Compare(props: any) {
  const { category, id } = useParams<{ category: string, id: string }>();
  const [currentBuilding, setCurrentBuilding] = useState<Ibuilding>();
  const [initalBuildings, setInitialBuildings] = useState<Ibuilding[]>();
  const [buildings, setBuildings] = useState<Ibuilding[]>();

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

  useEffect(() => {
    const allBuildings: Ibuilding[] = [];
    const fetchdata = async () => {
      const response = await axios.get(`/building/${category}`);
      allBuildings.push(response.data);
    };
    fetchdata();
    const fetchCurrentBuildingData = async () => {
      const response = await axios.get(`/building/${id}`);
      setCurrentBuilding(response.data);
    };
    fetchCurrentBuildingData();
    if (currentBuilding !== undefined) {
      const initialFilterd = allBuildings.filter((i: { year: Number, areal: Number }) => (
        (i.year <= currentBuilding.year + 10 && i.year >= currentBuilding.year - 10)
        && (i.areal <= currentBuilding.areal + 50 && i.areal >= currentBuilding.areal - 50)));
      setBuildings(initialFilterd);
      setInitialBuildings(initialFilterd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = (index: number, list: Ibuilding[] | undefined) => {
    const item = checkedItems[index];
    if (item.label === 'energimerke' && currentBuilding !== undefined && list !== undefined) {
      return list.filter((i: { energimerke: string; }) => (
        i.energimerke === currentBuilding.energimerke));
    }
    if (item.label === 'tek' && currentBuilding !== undefined && list !== undefined) {
      return list.filter((i: { tek: string; }) => i.tek === currentBuilding.tek);
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

  const openModal = (building: string) => {
    props.onChange(building);
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
        {buildings?.map((building: Ibuilding) => (
          // eslint-disable-next-line
          <a onClick={() => openModal(building.name)}>
            <Card buildingName={building.name} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Compare;
