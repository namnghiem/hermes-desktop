import React from 'react'
import Tasks from './views/Tasks'
const { ipcRenderer } = require('electron');
  
import 'bootstrap/dist/css/bootstrap.min.css';
/* 
import ipcRenderer from 'electron' */

import {Container, Row, Col} from 'react-bootstrap'
class App extends React.Component {
  constructor(props){
    super(props);
     this.state={json:""};
   }

  render(){
    
    if(this.state.json!=""){
      
    }
    return (
      <Container>
        <h1>Welcome Back!</h1>
        <p>Let's pick up where you left off.</p>
        <Tasks></Tasks>
        
      </Container>
    )
  }
  
}
  


export default App