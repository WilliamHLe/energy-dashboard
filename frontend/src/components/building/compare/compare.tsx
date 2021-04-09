import React, { useEffect, useState } from 'react';
import Card from './ComapreWithListCard';
import style from './compare.module.css';

function Compare() {
  const [buildings, setBuildings] = useState([
    { name: '' },
  ]);
  const [checkedItems, setCheckedItems] = useState([
    {
      name: 'box1',
      checked: false,
    },
    {
      name: 'box2',
      checked: false,
    },
    {
      name: 'box3',
      checked: false,
    },
  ]);

  useEffect(() => {
    // TODO: hent fra API og leggg til i buildings
    setBuildings([
      { name: 'Byåsen barnahage' },
      { name: 'Solstien barnehage' },
      { name: 'Eventyrstien barnehage' },
      { name: 'Regnbuen barnehage' },
      { name: 'Nygård barnehage' },
      { name: 'Byåsen barnahage' },
      { name: 'Solstien barnehage' },
      { name: 'Eventyrstien barnehage' },
      { name: 'Regnbuen barnehage' },
      { name: 'Nygård barnehage' },
    ]);
  }, []);

  const filter = () => {
    // TODO: legg til filter og API
    // foreløpig:
    if (checkedItems[0].checked === true) {
      setBuildings([]);
      buildings.forEach((building) => {
        if (building.name === 'Eventyrstien barnehage') {
          setBuildings([building]);
        }
      });
    }
  };

  // set checked for specified checkbox to true/ false
  const setCheckboxes = (index: number) => () => {
    const bool = checkedItems[index].checked;
    const newArr = [...checkedItems];
    newArr[index].checked = !(bool);
    setCheckedItems(newArr);
    filter();
  };

  return (
    <div className={`container ${style.wrapper}`}>
      <h2>Sammenlign deg med andre lignende bygg </h2>
      <div>
        {
                    checkedItems.map((item, index) => (
                      <div className={style.checkboxes}>
                        <label htmlFor={item.name}>
                          <p className={style.checkboxes}>
                            {item.name}
                          </p>
                          <input id={item.name} type="checkbox" checked={item.checked} onChange={setCheckboxes(index)} className={style.checkboxes} />
                        </label>
                      </div>
                    ))
                }
      </div>
      <div className={style.buildingList}>
        {buildings.map((building: any) => (
          <Card buildingName={building.name} />
        ))}
      </div>
    </div>
  );
}

export default Compare;
