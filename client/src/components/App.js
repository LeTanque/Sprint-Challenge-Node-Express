import React, { 
  Fragment,
  // useContext, 
  // useReducer, 
  useEffect, 
  useState
} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { StateProvider } from '../state/index.js';

import Projects from './Projects.jsx';
import ProjectDetail from './ProjectDetail.jsx';



const useAPI = endpoint => {
  const [ data, setData ] = useState([]);

  useEffect(() => { getData() }, []);
  
  const getData = async () => { 
    try {
      const response = await axios.get(endpoint);
      setData(response.data); 
    } catch (error) { 
      console.log(error)
    }
  };
  return data;
};


const App = () => {
  const initialState = {
    projects:[{
      id:'',
      name:'',
      description:'',
      completed:''
    }],
  }

  // const initialState = useContext(ProjectsContext);
  // const [ state, dispatch ] = useReducer(reducer, initialState);
  const projectsAll = useAPI("http://localhost:5000/api/projects");

  

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_PROJECTS":
        return {
          ...state,
          projects:action.payload
        }
        default:
          return state;
    }
  }

  
  return (
    <Fragment>
      <Router>
        <StateProvider initialState={initialState} reducer={reducer} >
        
          <Projects projectsAll={projectsAll} />
            



          {/* <Route 
            path='/'
            render={() => {
              <Projects projectsAll={projectsAll} />
            }}
          /> */}
          <Route 
            path='/project/:id'
            render={props => (
              <ProjectDetail 
                id={props.match.params.id}
                history={props.history}
              />
            )}
          />
          
        </StateProvider>
      </Router>
    </Fragment>
  );
}


export default App;
