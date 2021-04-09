import React, { useEffect, useState } from 'react';
// @ts-ignore
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';
import style from './navbar.module.css';

// eslint-disable-next-line no-unused-vars
const axios = require('axios').default;

function SearchBar() {
  const [search, setSearch] = useState<any>([]);
  const [inputs, setInputs] = useState('');

  console.log(process.env.REACT_APP_API_URI);
  useEffect(() => {
    // TODO: hent data fra api og legg det til state her
    // foreløpig til testing:
    const fetchdata = async () => {
      const response = await axios.get('/buildings');
      setSearch(response.data);
    };
    fetchdata();
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
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 0',
          fontSize: '90%',
          position: 'fixed',
          overflow: 'auto',
          maxHeight: '50%',
          zIndex: 10,
        }}
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
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`${item.category}/${item.label}`}>{item.label}</Link>
            </li>
          </div>
        )}
      />
    </div>
  );
}

export default SearchBar;
