import React from 'react'
const { ipcRenderer } = require('electron');
const shell  = require('electron').shell;
import splashImage from '../assets/sync.svg';

/* 
import ipcRenderer from 'electron' */

import {Container, Row, Col} from 'react-bootstrap'

class Pair extends React.Component {
  constructor(props){
    super(props);
    this.state={tasks:[]}
   }

  viewInBrowser(task){
      shell.openExternal(task.url);
  }

  render(){
    return (
        <Row className="pair">
          <h2>Let's connect to your phone.</h2>
          <div className="progress-line"></div>

          <img className="splash_img" src={splashImage}/>
          <p>Select this device on the companion app.</p>
          <p>You'll need to be on the same network. Some public, work or school networks may block this app from working.</p>
          

        
        </Row>
    )
  }
  componentDidMount(){
    ipcRenderer.send("START_SERVER_UNPAIRED");
    ipcRenderer.on('PAIR_REQUEST', (event, arg) => {
    });
    
  }
}
  


export default Pair