import React, { useEffect, useState } from 'react';
// @ts-ignore
import Autocomplete from 'react-autocomplete';
import { Redirect } from 'react-router-dom';
import style from './navbar.module.css';

const axios = require('axios').default;

function SearchBar() {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState<any>([]);
  const [inputs, setInputs] = useState('');

  const selectBuilding = (item: any, key: { id: string, label: string }) => {
    console.log(key);
    console.log(key.id); // henter ut id til byggg
    console.log(key.label); // henter ut navn til bygg
    return <Redirect to="/skoler" />;
  };

  useEffect(() => {
    // TODO: hent data fra api og legg det til state her
    // foreløpig til testing:
    axios.get('/buildings')
      .then((response: any) => {
        setSearch(response.data);
      });
    /* fetch('http://localhost:3000/categories')
      .then((results) => {
       y console.log(results);
      });
    /* const fetchData = async () => {
      const results = await fetch(`${process.env.REACT_APP_API_URI}/categories`);
      console.log(results);
    };
    /* setSearch([{
      id: '22',
      name: 'banan',
    },
    {
      id: '26',
      name: 'appelsin',
    },
    {
      id: '25',
      name: 'eple',
    },
    {
      id: '27',
      name: 'pære',
    },
    {
      id: '28',
      name: 'drue',
    },
    ]); */
    // fetchData();
  }, []);

  return (
    <div className={style.wrapper}>
      <Autocomplete
        className={style.searchbar}
        items={search.map((item: any) => ({
          id: item.id,
          label: item.name,
          category: item.category.name,
        }))}
        shouldItemRender={(it: { label: string }, value: string) => it.label.indexOf(value) > -1}
        getItemValue={(item: { label: string; }) => item.label}
        value={inputs}
        inputProps={{ placeholder: 'søk etter bygg' }}
        onChange={(e: any) => setInputs(e.target.value)}
        onSelect={selectBuilding}
        renderItem={(item:
                         { id: string, label: string, category: string, },
        highlighted: boolean) => (
          <div
            key={item.id}
            style={{
              backgroundColor: highlighted ? '#628494' : '#fff',
              color: highlighted ? '#fff' : '#000000',
            }}
          >
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href={`${item.category}/${item.label}`}>{item.label}</a>
            </li>
          </div>
        )}
      />
    </div>
  );
}

export default SearchBar;
