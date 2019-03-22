import React, { 
  Fragment,
  // useEffect, 
  // useContext,
  // useReducer,
  // useState,
} from 'react';
import ProjectsContext from '../state/context';






const Projects = () => {
  



  // console.log(props)

  return (
    <ProjectsContext.Consumer>
      <Fragment>
          <h3>Projects</h3>

          {/* {this.props.projects.map(project => console.log(project))} */}

      </Fragment>
    </ProjectsContext.Consumer>
  );

}

export default Projects;
