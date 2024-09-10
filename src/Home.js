import './App.css';
import {Moviecomp,Sidebar} from './component';
import axios from 'axios';
import React from 'react';
import { server_addr } from './utils/PrivateRoutes';

let obj=await axios.post(`http://${server_addr}/Home`,["Home"]).then(res=>{return res.data});

export default function Home() {
  
  const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
  console.log(picpath+obj[0]["Picture"]);
  

  return (
    
    <body class="body">
    
    
    <div class="App-header">
    <Sidebar/>
      {obj.map((i)=><Moviecomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]} id={i["movie_id"]} 
      name={i["Title"]}/>)}
     
    </div>
    </body>
  );
}

