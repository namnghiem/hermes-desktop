import React from 'react'
import Tasks from './views/Tasks'
import Pair from './views/Pair'

const { ipcRenderer } = require('electron');
const storage = require('electron-json-storage');

import 'bootstrap/dist/css/bootstrap.min.css';
/* 
import ipcRenderer from 'electron' */

import {Container, Row, Col} from 'react-bootstrap'
class App extends React.Component {
  constructor(props){
    super(props);
     this.state={config:undefined};
   }

  render(){
    
    if(this.state.config==undefined){
      return(
        <Container>
          <Pair></Pair>
        </Container>
      )
    }else{
      return (
        <Container>
          <h1>Welcome Back!</h1>
          <p>Let's pick up from where you left off.</p>
          <Tasks></Tasks>
          
        </Container>
      )
    }
  }
  componentDidMount(){
    
  }
}
  


export default App