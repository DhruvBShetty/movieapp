import './App.css';
import {Moviecomp,Sidebar} from './component';
import axios from 'axios';
import { server_addr } from './utils/PrivateRoutes';
import React from 'react';

let obj=await axios.post(`http://${server_addr}/Home`,["Action"]).then(res=>res.data);


export default function Action() {

  const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
  

  return (
    
    <body class="body">
      
    <div class="App-header">
      <Sidebar/>
      {obj.map((i)=><Moviecomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]} id={i["movie_id"]}
      name={i["Title"]}/>)}

      {/* <Moviecomp piclink={picpath+obj[0]["Picture"]} overview={obj[0]["Overview"]} voteavg={obj[0]["Vote_Avg"]}/> */}
     
    </div>
    </body>
  );
}

