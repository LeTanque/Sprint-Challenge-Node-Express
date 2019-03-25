import React, { 
  Fragment,
  useEffect, 
} from 'react';
import { Link } from 'react-router-dom';
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
      if(!project.completed) {
        project.completed='Project is not Completed';
      } else {
        project.completed='Project Complete'
      }
      return (
        <Fragment key={project.id}>
          <section className='project-card'>
            <Link 
              // onClick={(event) => {
              //   this.props.targetNoteSet(event, this.props.note);
              // }}
              to={`/project/${project.id}`}
            >
              <div>
                {project.name}
              </div>
            </Link>
            <div>
              <i>{project.description}</i>
            </div>
            <div>
              Project #: {project.id}
            </div>
            <div>
              {project.completed}
            </div>
          </section>
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
