const net = require('net');
const tls = require('tls');
const fs = require('fs');
const util = require('../util/util');
const os = require('os'); 
const {machineId, machineIdSync} = require('node-machine-id');


const startPairingBridge = (onPairRequest) => {
    
  var crypto = util.genKeys();
  
  const options = {
    key: crypto.pkey,
    cert: crypto.cert,
    rejectUnauthorized: false,
    requestCert: false
  }; 
  
  const server = tls.createServer(options, (socket) => {
   /*  console.log(socket.getPeerCertificate());
 */
    socket.setEncoding('utf8');/* 
    console.log(socket.getPeerCertificate()); */

    socket.on('data', function(data){
        onPairRequest(data, socket);
    });

    socket.on('end', function(){
            socket.end();
    });

    socket.on('error', function(){
        console.log("DISCONNECTED");
    })
  });   

  /* 
  var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  }); */

  server.listen(3444,'0.0.0.0');

}

const acceptPairRequest = (socket) => {
    let id = machineIdSync()
    const computerName = os.hostname()
    
    //send accept signal
    if(socket!=undefined){            
        var accept = {};
        accept["type"]="PAIR_ACCEPT";
        accept["id"]=id;
        accept["name"]=computerName;
        socket.write(JSON.stringify(accept));
    }

}

exports.startPairingBridge=startPairingBridge;