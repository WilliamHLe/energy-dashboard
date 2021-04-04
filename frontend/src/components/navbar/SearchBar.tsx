import React, { useEffect, useState } from 'react';
// @ts-ignore
import Autocomplete from 'react-autocomplete';
import { Redirect } from 'react-router-dom';
import style from './navbar.module.css';

function SearchBar() {
  const [search, setSearch] = useState([{
    id: '',
    label: '',
  }]);
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
    setSearch([{
      id: '22',
      label: 'banan',
    },
    {
      id: '26',
      label: 'appelsin',
    },
    {
      id: '25',
      label: 'eple',
    },
    {
      id: '27',
      label: 'pære',
    },
    {
      id: '28',
      label: 'drue',
    },
    ]);
  }, []);

  return (
    <div className={style.wrapper}>
      <Autocomplete
        className={style.searchbar}
        items={search.map((item) => ({
          id: item.id,
          label: item.label,
        }))}
        shouldItemRender={(it: { label: string }, value: string) => it.label.indexOf(value) > -1}
        getItemValue={(item: { label: string; }) => item.label}
        value={inputs}
        inputProps={{ placeholder: 'søk etter bygg' }}
        onChange={(e: any) => setInputs(e.target.value)}
        onSelect={selectBuilding}
        renderItem={(item: { id: string, label: string }, highlighted: boolean) => (
          <div
            key={item.id}
            style={{
              backgroundColor: highlighted ? '#628494' : '#fff',
              color: highlighted ? '#fff' : '#000000',
            }}
          >
            <li>
              {item.label}
            </li>
          </div>
        )}
      />
    </div>
  );
}

export default SearchBar;
