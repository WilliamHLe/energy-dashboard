import React from 'react';
import style from './topList.module.css';
import SearchBar from '../../../searchbar/Searchbar';
import CategoryTopListCard from './CategoryTopListCard';

interface ICategory {
  id: string,
  name: string
}
interface ITopListData {
  building: {id: string, name: string, category:ICategory },
  score: number
}
const MockData:ITopListData[] = [
  {
    building: {
      id: '4edd40c86762e0fb12000003',
      name: 'Solsiden Barnehage',
      category: {
        id: '4edd40c86762e0fb12000003',
        name: 'Barnehage',
      },
    },
    score: 98,
  },
  {
    building: {
      id: '4edd40c86762e0fb12000003',
      name: 'Solsiden Barnehage',
      category: {
        id: '4edd40c86762e0fb12000003',
        name: 'Barnehage',
      },
    },
    score: 98,
  },
  {
    building: {
      id: '4edd40c86762e0fb12000003',
      name: 'Solsiden Barnehage',
      category: {
        id: '4edd40c86762e0fb12000003',
        name: 'Barnehage',
      },
    },
    score: 98,
  },
  {
    building: {
      id: '4edd40c86762e0fb12000003',
      name: 'Solsiden Barnehage',
      category: {
        id: '4edd40c86762e0fb12000003',
        name: 'Barnehage',
      },
    },
    score: 98,
  },
  {
    building: {
      id: '4edd40c86762e0fb12000003',
      name: 'Solsiden Barnehage',
      category: {
        id: '4edd40c86762e0fb12000003',
        name: 'Barnehage',
      },
    },
    score: 98,
  },
];

const CategoryTopList = () => (
  <div className={`container ${style.wrapper}`}>
    <div className={style.textbox}>
      <h1>Hvilken barnehage har spart mest energi sammenlignet med i fjor?</h1>
      <p>Klikk på en barnehage for å se mer info om denne. Kanskje kan du hente noen tips?</p>
    </div>
    <SearchBar />
    <div className={style.info}>
      <p>{`Barnehager (${MockData.length})`}</p>
      <p>Spart %</p>
    </div>
    <div className={style.buildingList}>
      { MockData.map((building, index) => (
        <CategoryTopListCard
          buildingName={building.building.name}
          index={index + 1}
          score={building.score}
        />
      )) }
    </div>
  </div>
);

export default CategoryTopList;
