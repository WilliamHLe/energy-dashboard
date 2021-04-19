import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/buildingCategoryOverview/Test';
import Navbar from './components/navbar/Navbar';
import Main from './components/mainpage/Main';
import BuildingCategoryOverview from './components/buildingCategoryOverview/BuildingCategoryOverview';
import Building from './components/building/Building';
import InfoBar from './components/infobar/Infobar';
import TwoPercentRace from './components/mainpage/animation/TwoPercentRace';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 8000);
  }, []);
  return (
    <>
      {!loading ? (
        <Router>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <InfoBar />
                <Main />
              </Route>
              <Route exact path="/energitips">
                <Test />
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
      ) : (<TwoPercentRace loading={loading} />)}

    </>
  );
}

export default App;
