import React from 'react';
import './style/style.css';
import {
  NavLink, // useRouteMatch, useParams,
} from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

export default function Navbar() {
  const onSearch = (value:String) => alert(value);

  return (
    <div>
      <Search style={{ width: 'auto' }} allowClear enterButton onSearch={onSearch} placeholder="Søk etter bygg" />

      <NavLink className="menuitems oversikt" activeClassName="selected oversiktF" exact to="/">Oversikt</NavLink>
      <NavLink className="menuitems skoler" activeClassName="selected skolerF" to="/skoler">Skoler</NavLink>

      <NavLink className="menuitems barnehager" activeClassName="selected barnehagerF" to="/bhager">Barnehager</NavLink>

      <NavLink className="menuitems sykehjem" activeClassName="selected sykehjemF" to="/sykehjem">Sykehjem</NavLink>

      <NavLink className="navlink menuitems idrett" activeClassName="selected idrettF" to="/ibygg">Idrettsbygg</NavLink>

      <NavLink className="navlink menuitems andre" activeClassName="selected andreF" to="/abygg">Andre bygg</NavLink>

      <NavLink className="navlink menuitems energi" activeClassName="selected energiF" to="/energitips">Energitips</NavLink>

    </div>
  );
}
