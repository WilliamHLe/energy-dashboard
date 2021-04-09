import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './navbar.module.css';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className={style.container}>
      <SearchBar />
      <NavLink className={`${style.menuitems} ${style.oversikt}`} activeClassName={`${style.selected} ${style.oversiktF}`} exact to="/">Oversikt</NavLink>
      <NavLink className={`${style.menuitems} ${style.skoler}`} activeClassName={`${style.selected} ${style.skolerF}`} to="/skoler">Skoler</NavLink>

      <NavLink className={`${style.menuitems} ${style.barnehager}`} activeClassName={`${style.selected} ${style.barnehagerF}`} to="/barnehager">Barnehager</NavLink>

      <NavLink className={`${style.menuitems} ${style.sykehjem}`} activeClassName={`${style.selected} ${style.sykehjemF}`} to="/sykehjem">Sykehjem</NavLink>

      <NavLink className={`${style.menuitems} ${style.idrett}`} activeClassName={`${style.selected} ${style.idrettF}`} to="/idrettsbygg">Idrettsbygg</NavLink>

      <NavLink className={`${style.menuitems} ${style.andre}`} activeClassName={`${style.selected} ${style.andreF}`} to="/andre">Andre bygg</NavLink>

      <NavLink className={`${style.menuitems} ${style.energi}`} activeClassName={`${style.selected} ${style.energiF}`} to="/energitips">Energitips</NavLink>
    </nav>
  );
}
