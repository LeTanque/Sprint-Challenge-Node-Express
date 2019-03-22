import React, { 
  Fragment,
  useEffect, 
} from 'react';
import { useStateValue } from '../state/index.js';



const Project = props => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "GET_PROJECTS",
      payload: props.projectsAll.projects
    });
  }, [props.projectsAll]);


  let showResult;
  if (state.projects !== undefined) {
    showResult = state.projects.map(project => {
      return (
        <Fragment key={project.id}>
          <div>{project.name}</div>
          <div><i>{project.description}</i></div>
          <br />
        </Fragment>
      )
    })
  }
  else {
    showResult = null
  }

  return (
    <Fragment>

      {showResult}

    </Fragment>
  );
}

export default Project;
