import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './topList.module.css';
import SearchBar from '../../navbar/SearchBar';
import CategoryTopListCard from './CategoryTopListCard';
import getHighscoreList from '../../../services/highscoresService';

interface ICategory {
  id: string,
  name: string
}
interface ITopListData {
  building: {id: string, name: string, category: ICategory },
  score: number
}

const CategoryTopList = () => {
  const { category } = useParams<{category: string}>();
  const [data, setData] = useState<ITopListData[]>([]);
  // Fetching the buildings from a category sorted by energy saved since last year
  useEffect(() => {
    const fetchData = async () => {
      setData(await getHighscoreList(category));
    };
    fetchData();
  }, [category]);

  return (
    <div className={`container ${style.wrapper}`}>
      <div className={style.textbox}>
        <h1>
          { (category === 'helsebygg' || category === 'idrettsbygg' || category === 'annet') ? 'Hvilket' : 'Hvilken' }
          {' '}
          { (category === 'annet') ? 'annet bygg' : category }
          {' '}
          har spart mest energi sammenlignet med i fjor?
        </h1>
        <p>
          Klikk på
          { (category === 'helsebygg' || category === 'idrettsbygg' || category === 'annet') ? 'et' : 'en' }
          { (category === 'annet') ? 'annet bygg' : category }
          for å se mer info om denne. Kanskje kan du hente noen tips?
        </p>
      </div>
      <SearchBar data={data.map((building: any) => building?.building)} />
      <div className={style.info}>
        <p>{`${category[0].toUpperCase()}${category.slice(1)} (${data.length})`}</p>
        <p>Spart %</p>
      </div>
      <div className={style.buildingList}>
        {data.map((building, index) => (
          <CategoryTopListCard
            buildingName={building?.building?.name}
            index={index + 1}
            score={building?.score}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTopList;
