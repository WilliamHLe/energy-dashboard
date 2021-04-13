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

function Compare() {
  const { id } = useParams<{ id: string }>();
  const [currentBuilding] = useState({
    name: id,
    tek: 'TEK18',
    areal: 1234,
    year: 1990,
    energimerke: 'C',
  });

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
    const initalfetch = ([
      {
        name: 'Tiller barnahage',
        tek: 'TEK17',
        areal: 1284,
        year: 2000,
        energimerke: 'C',
      },
      {
        name: 'Solstien barnehage',
        tek: 'TEK18',
        areal: 1234,
        year: 1995,
        energimerke: 'C',
      },
      {
        name: 'Eventyrstien barnehage',
        tek: 'TEK18',
        areal: 1234,
        year: 1999,
        energimerke: 'B',
      },
      {
        name: 'Regnbuen barnehage',
        tek: 'TEK18',
        areal: 1204,
        year: 1997,
        energimerke: 'A',
      },
      {
        name: 'Nygård barnehage',
        tek: 'TEK17',
        areal: 1260,
        year: 1980,
        energimerke: 'C',
      },
      {
        name: 'Byåsen barnahage',
        tek: 'TEK18',
        areal: 1234,
        year: 1990,
        energimerke: 'A',
      },
      {
        name: 'ABC barnehage',
        tek: 'TEK18',
        areal: 6000,
        year: 2000,
        energimerke: 'C',
      },
      {
        name: 'Soltun barnehage',
        tek: 'TEK12',
        areal: 1234,
        year: 2068,
        energimerke: 'C',
      },
      {
        name: 'jadamasa barnehage',
        tek: 'TEK18',
        areal: 5000,
        year: 2058,
        energimerke: 'C',
      },
    ]);
    const initialFilterd = initalfetch.filter((i: { year: Number, areal: Number }) => (
      (i.year <= currentBuilding.year + 10 && i.year >= currentBuilding.year - 10)
      && (i.areal <= currentBuilding.areal + 50 && i.areal >= currentBuilding.areal - 50)));
    setBuildings(initialFilterd);
    setInitialBuildings(initialFilterd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = (index: number, list: Ibuilding[] | undefined) => {
    const item = checkedItems[index];
    if (item.label === 'energimerke' && list !== undefined) {
      return list.filter((i: { energimerke: string; }) => (
        i.energimerke === currentBuilding.energimerke));
    }
    if (item.label === 'tek' && list !== undefined) {
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
      <div>

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
          <Card buildingName={building.name} />
        ))}
      </div>
    </div>
  );
}

export default Compare;
