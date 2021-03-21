import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/category/Test';
import Navbar from './components/navbar/Navbar';
import Main from './components/mainpage/Main';
import InfoItem from './components/infobar/InfoItem';
import Icon from './components/infobar/icons/noto_house.png';
import Category from './components/category/Category';

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
            <Route exact path="/energitips">
              <Test />
            </Route>
            <Route exact path="/:category">
              <Category />
            </Route>
            <Route path="/">
              <Test />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
