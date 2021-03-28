
const forge = require('node-forge');
const fs = require('fs');
var path = require('path');


const genKeys = () =>{
  
  if(fs.existsSync('ssl/server-cert.pem')&&fs.existsSync('ssl/server-key.pem')){
    var pkey = fs.readFileSync('ssl/server-key.pem');
    var cert = fs.readFileSync('ssl/server-cert.pem');

  }else{

    var pki = forge.pki;
    var keys = pki.rsa.generateKeyPair(2048);
    var cert = pki.createCertificate();
  
    var attrs = [
      {name:'commonName',value:'0.0.0.0'}
     ,{name:'countryName',value:'US'}
     ,{shortName:'ST',value:'Virginia'}
     ,{name:'localityName',value:'Blacksburg'}
     ,{name:'organizationName',value:'Test'}
     ,{shortName:'OU',value:'Test'}
    ];
  
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear()+1);
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(keys.privateKey);
    
    var pem_pkey = pki.privateKeyToPem(keys.privateKey);
    var pem_cert = pki.certificateToPem(cert);
  
    fs.writeFileSync(path.join(__dirname, '..', '..', 'server-cert.pem'), pem_cert);
    fs.writeFileSync(path.join(__dirname, '..', '..', 'server-key.pem'), pem_pkey);
  
  
  }

  return {
    pkey:pem_pkey,
    cert:pem_cert
  }
}

const androidPackageToTask = (task) => {
  //youtube
  switch(task.data){
    case  "com.google.android.youtube":
      return{url:'https://www.youtube.com/feed/history',title:'YouTube'}
    case  "com.facebook.orca":
      return{url:'https://messenger.com/',title:'Messenger'}
    case  "com.whatsapp":
      return{url:'https://web.whatsapp.com',title:'WhatsApp'}
    case  "com.discord":
      return{url:'https://discord.com/app',title:'Discord'}
    case  "com.google.android.apps.messaging":
      return{url:'https://messages.google.com/web/',title:'Messages'}
    case  "com.google.android.gm":
      return{url:'https://mail.google.com',title:'Gmail'}
    default:
      return (null);
                                  
  } 
  
}

module.exports = {genKeys, androidPackageToTask};