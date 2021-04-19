import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Main from './components/mainpage/Main';
import BuildingCategoryOverview from './components/buildingCategoryOverview/BuildingCategoryOverview';
import Building from './components/building/Building';
import InfoBar from './components/infobar/Infobar';
import EnergyTips from './components/energyTips/EnergyTips';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <InfoBar />
              <Main />
            </Route>
            <Route exact path="/energitips">
              <EnergyTips />
            </Route>
            <Route exact path="/:category">
              <InfoBar />
              <BuildingCategoryOverview />
            </Route>
            <Route path="/:category/:id">
              <InfoBar />
              <Building />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
