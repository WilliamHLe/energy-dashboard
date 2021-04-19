import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import style from './topList.module.css';
import SearchBar from '../../navbar/SearchBar';
import CategoryTopListCard from './CategoryTopListCard';

const ls = require('localstorage-ttl');

interface ICategory {
  id: string,
  name: string
}
interface ITopListData {
  building: {id: string, name: string, category:ICategory },
  score: number
}
// eslint-disable-next-line no-unused-vars
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

const CategoryTopList = () => {
  const { category } = useParams<{category:string}>();
  const [data, setData] = useState<ITopListData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/highscores/${category}`);
      ls.set(`${category}_highscores`, result.data, [604800000]);
      setData(result.data);
    };
    if (ls.get(`${category}_highscores`)) {
      setData(ls.get(`${category}_highscores`));
    } else {
      fetchData();
    }
  }, [category]);

  return (
    <div className={`container ${style.wrapper}`}>
      <div className={style.textbox}>
        <h1>Hvilken barnehage har spart mest energi sammenlignet med i fjor?</h1>
        <p>Klikk på en barnehage for å se mer info om denne. Kanskje kan du hente noen tips?</p>
      </div>
      <SearchBar data={data.map((building:any) => building.building)} />
      <div className={style.info}>
        <p>{`Barnehager (${data.length})`}</p>
        <p>Spart %</p>
      </div>
      <div className={style.buildingList}>
        {data.map((building, index) => (
          <CategoryTopListCard
            buildingName={building.building.name}
            index={index + 1}
            score={building.score}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTopList;
