import React, { Fragment, Component } from 'react';
import logo from '../assets/logo.svg';

import Projects from './Projects.jsx';


class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Projects />
          </header>
        </div>
      </Fragment>
    );
  }
}

export default App;
