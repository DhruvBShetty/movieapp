import './App.css';
import {Moviecomp,Sidebar} from './component';
import axios from 'axios';

import React from 'react';

// let obj=await axios.post('http://${server_addr}/Home',["Action"]).then(res=>res.data);


export default function Action() {
  

  return (
    
    <body class="body">
      <Sidebar/>
    <div class="App-header">
      {obj.map((i)=><Moviecomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]}/>)}

      {/* <Moviecomp piclink={picpath+obj[0]["Picture"]} overview={obj[0]["Overview"]} voteavg={obj[0]["Vote_Avg"]}/> */}
     
    </div>
    </body>
  );
}

