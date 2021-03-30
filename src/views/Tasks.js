import React from 'react'
const { ipcRenderer } = require('electron');
const shell  = require('electron').shell;

/* 
import ipcRenderer from 'electron' */

import {Container, Row, Col} from 'react-bootstrap'

class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.state={tasks:[]}
   }

  viewInBrowser(task){
      shell.openExternal(task.url);
  }

  render(){
    return (
        <Row className="tasks">
          {this.state.tasks.map((task) =>{ 
            var url = new URL(task.url);
            var favicon = "https://api.faviconkit.com/"+url.hostname+"/144"
            return(
                <Col xs={6} >
                  <div className="task_container" onClick={() => this.viewInBrowser(task)}>
                    <img src={favicon} className="task_img"></img>
                    <p className="task_title">{task.title}</p>
                  </div>                  
                </Col>                
            )
          }
          )}

        
        </Row>
    )
  }
  componentDidMount(){
    ipcRenderer.send("START_SERVER_PAIRED");

    ipcRenderer.on('SYNC_TASKS', (event, arg) => {
      console.log(arg);

      this.setState({
        tasks:arg
      });

    }) 
  }
}
  


export default Tasks