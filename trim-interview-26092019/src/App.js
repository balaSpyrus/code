import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BreadCrumb from './components/breadCrumb';
import CreateUser from './components/createUser';
import MainView from './components/mainView';
import NavBar from './components/navBar';
import SiderBar from './components/sideBar';
import { Spinner, TYPE } from './components/spinner';

function App() {

  useEffect(() => {
    // BreadCrumb.setLink('/','Home')
  }, [])


  return (
    <div className="App">
      {/* <Router>
        <NavBar />
        <BreadCrumb
          className='breadcrumb'
        /> */}
      <Spinner
        type={TYPE.DOT}
      />
      <Spinner
      />
      {/* <SiderBar />
        <Switch>
          <Route exact path='/createUser' render={props => {
            // console.log(props);
            // BreadCrumb.setLink(props.location.pathname,'createUser')
            return <CreateUser {...props} />
          }} />
          <Route exact path='/:list' render={props => <MainView {...props} />} />
          <Route exact path='/:list/:item' render={props => <MainView {...props} />} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
