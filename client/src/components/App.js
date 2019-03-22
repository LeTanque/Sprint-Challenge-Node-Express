import React, { 
  // Fragment,
  // useContext, 
  // useReducer, 
  useEffect, 
  useState
} from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import { StateProvider } from '../state/index.js';

import Projects from './Projects.jsx';



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
  const projectsAll = useAPI("http://localhost:5000/api/projects/all");

  

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
    <StateProvider initialState={initialState} reducer={reducer} >
      {/* {console.log('App.js  :', initialState)} */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Projects projectsAll={projectsAll} />
        </header>
      </div>
    
    </StateProvider>
  );
}


export default App;
