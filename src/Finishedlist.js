import './App.css';
import {Moviecomp,Sidebar} from './component';
import axios from 'axios';
import React from 'react';
import { server_addr } from './utils/PrivateRoutes';

import {token} from './utils/PrivateRoutes';
let obj=[];
let obj1=[];
if(token.uname!='' && token.uid!=''){
const sql=`select * from movie_info,lists,movie where movie_info.movie_id=lists.mid and 
lists.done=1 and lists.uid=${token.uid} and movie.id=lists.mid;`
obj1=await axios.get(`http://${server_addr}/Report2`,{
  withCredentials: true,
}).then(res=>res.data);
obj=await axios.post(`http://${server_addr}/generalup`,[sql]).then(res=>res.data);}

export default function Finishedlist(){
  
  const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

  return (
    
    <body class="body">
    <Sidebar/>
    
    <div class="App-header">

    <div class="customh">
    <h2>Completed</h2>
    </div>

    <table style={{width:"100%",height:"50%",fontSize:"60%",color:"white",borderSpacing:"15px",backgroundColor:"black",margin:"5px"}}>
     {/* <caption><h3>Watchlist Report</h3></caption> */}
     <thead>
        <tr>
          <th>Genre</th>
          <th>Genre_Count</th>
          <th>Avg_runtime</th>
          <th>Avg_vote</th>
          
        </tr>
      </thead>
      <tbody>
        {obj1.map((it) => (
          <tr>
            <td>{it.Genre}</td>
            <td>{it['genre_count']}</td>
            <td>{it['AVG_runtime']}</td>
            <td>{it['avg_vote'].toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      </table> 

      {obj.map((i)=><Moviecomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]} id={i["movie_id"]} 
      name={i["Title"]}/>)}
     
    </div>
    </body>
  );
}
