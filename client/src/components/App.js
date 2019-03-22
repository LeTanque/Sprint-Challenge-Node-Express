import React, { 
  // Fragment,
  // useContext, 
  // useReducer, 
  // useEffect, 
  // useState
} from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import ProjectsContext from '../state/context';
// import reducer from '../state/reducer';
import StateProvider from '../state/index.js';

import Projects from './Projects.jsx';




// const useAPI = endpoint => {
//   const [ data, setData ] = useState([]);

//   useEffect(() => { getData() }, []);
  
//   const getData = async () => { 
//     try {
//       const response = await axios.get(endpoint);
//       setData(response.data); 
//     } catch (error) { 
//       console.log(error)
//     }
//   };
//   return data;
// };


const App = () => {
  // const initialState = useContext(ProjectsContext);
  // const [ state, dispatch ] = useReducer(reducer, initialState);
  // const projectsAll = useAPI("http://localhost:5000/api/projects/all");

  
  // useEffect(() => {
  //   dispatch({
  //     type: "GET_PROJECTS",
  //     payload: projectsAll
  //   });
  // }, [projectsAll]);

  // console.log(state)
  return (
    <ProjectsContext.Provider value={{ state, dispatch }}>
    
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Projects projects={state.projects} />
        </header>
      </div>
    
    </ProjectsContext.Provider>
  );
}


export default App;
