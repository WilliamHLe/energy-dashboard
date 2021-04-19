import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from './ComapreWithListCard';
import style from './compare.module.css';

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

function Compare(props: any) {
  // eslint-disable-next-line no-unused-vars
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
    const allBuildings: any[] = [];
    const fetchCurrentBuildingData = async () => {
      const teksatandard = ['TEK17', 'TEK18', 'TEK16'];
      const energimerke = ['A', 'B', 'C', 'D'];
      const responseBuilding = await axios.get(`/search?name=${id}`);
      const o = Math.floor(Math.random() * 2);
      const u = Math.floor(Math.random() * 3);
      responseBuilding.data[0].tek = teksatandard[o];
      responseBuilding.data[0].energyLabel = energimerke[u];
      setCurrentBuilding(responseBuilding.data[0]);
      const responseBuildings = await axios.get(`/buildings?category=${responseBuilding.data[0].category}`);
      allBuildings.push(responseBuildings.data);
      if (allBuildings.length > 0) {
        const initialFilterd = allBuildings[0].filter((i: {
          name: String,
          year: Number,
          area: Number
        }) => (
          // eslint-disable-next-line max-len
          (i.year <= responseBuilding.data[0].year + 50
              && i.year >= responseBuilding.data[0].year - 50)
            && (i.area <= responseBuilding.data[0].area + 500
            && i.area >= responseBuilding.data[0].area - 500)
        && (i.name !== responseBuilding.data[0].name)));
        setBuildings(initialFilterd);
        setInitialBuildings(initialFilterd);
      }
    };
    fetchCurrentBuildingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filter = (index: number, list: Ibuilding[] | undefined) => {
    const item = checkedItems[index];
    if (item.label === 'energimerke' && currentBuilding !== undefined && list !== undefined) {
      return list.filter((i: { energyLabel: string; }) => (
        i.energyLabel === currentBuilding.energyLabel));
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
