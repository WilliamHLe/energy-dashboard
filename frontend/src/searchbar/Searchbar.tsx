import React from 'react';
import Search from './icons/search.png';
import style from './searchBar.module.css';

const SearchBar = () => (
  <div className={style.wrapper}>
    <div className={style.searchbar}>
      <input type="text" placeholder="Søk etter bygg" />
      <img src={Search} alt="søke-ikon" />
    </div>
  </div>

);

export default SearchBar;
