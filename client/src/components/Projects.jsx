import React, { 
  Fragment,
  // useEffect, 
  // useContext,
  // useReducer,
  // useState,
} from 'react';
import { Link } from 'react-router-dom';
import Project from './Project.jsx';

import logo from '../assets/logo.svg';


const Projects = props => {  
  return (
      <Fragment>

        <div className="App">
          <header className="App-header">
            <Link to='/'>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <h3>Projects</h3>

            <Project projectsAll={props.projectsAll} />
          </header>
        </div>
      </Fragment>
  );
}

export default Projects;
