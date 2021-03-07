import React from 'react';
import { Affix, Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Test2 from './components/Test2';
import Navbar from './components/navbar/Navbar';

const { Content, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Sider style={{ backgroundColor: '#030E22' }} width={300} className="site-layout-background">
          <Affix offsetTop={5}>
            <Navbar />
          </Affix>
        </Sider>
        <Layout>
          <Content className="site-layout-background">
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Test bygg="Oversikt" />
                </Route>
                <Route path="/skoler">
                  <Test bygg="Skole" />
                </Route>
                <Route path="/bhager">
                  <Test bygg="Barnehage" />
                </Route>
                <Route path="/sykehjem">
                  <Test bygg="Sykehjem" />
                </Route>
                <Route path="/ibygg">
                  <Test2 bygg="Idrettsbygg" />
                </Route>
                <Route path="/abygg">
                  <Test2 bygg="Andre bygg" />
                </Route>
                <Route path="/energitips">
                  <Test bygg="Energitips" />
                </Route>
                <Route path="/">
                  <Test />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
