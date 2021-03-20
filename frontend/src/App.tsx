import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/category/Test';
import Test2 from './components/category/Test2';
import Navbar from './components/navbar/Navbar';
import Main from './components/mainpage/Main';
import InfoItem from './components/infobar/InfoItem';
import Icon from './components/infobar/icons/noto_house.png';
import Building from './components/building/Building';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <InfoItem heading="660" description="Bygg som overvåkes" icon={Icon} />
          <InfoItem heading="660" description="Bygg som overvåkes og mer som skal stå" icon={Icon} />
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/skoler">
              <Test bygg="Skole" />
            </Route>
            <Route exact path="/bhager">
              <Test bygg="Barnehage" />
            </Route>
            <Route exact path="/sykehjem">
              <Test bygg="Sykehjem" />
            </Route>
            <Route exact path="/ibygg">
              <Test2 bygg="Idrettsbygg" />
            </Route>
            <Route exact path="/abygg">
              <Test2 bygg="Andre bygg" />
            </Route>
            <Route path="/energitips">
              <Test bygg="Energitips" />
            </Route>
            <Route path="/:category/:id">
              <Building />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
