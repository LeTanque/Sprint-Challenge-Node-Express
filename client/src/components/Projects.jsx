import React, { 
  Fragment,
  // useEffect, 
  // useContext,
  // useReducer,
  // useState,
} from 'react';
import Project from './Project.jsx';



const Projects = props => {  
  return (
      <Fragment>

          <h3>Projects</h3>

          <Project projectsAll={props.projectsAll} />

      </Fragment>
  );
}

export default Projects;
