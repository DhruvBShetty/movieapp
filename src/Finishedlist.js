import './App.css';
import {Moviecomp,Sidebar} from './component';
import axios from 'axios';
import React from 'react';

let token = await axios.get("http://localhost:8081/getsession").then(res=>res.data);
let obj=[];
if(token.uname!='' && token.uid!=''){
const sql=`select * from movie_info,lists,movie where movie_info.movie_id=lists.mid and 
lists.done=1 and lists.uid=${token.uid} and movie.id=lists.mid;`
obj=await axios.post('http://localhost:8081/generalup',[sql]).then(res=>res.data);}

export default function Finishedlist(){
  
  const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

  return (
    
    <body class="body">
    <Sidebar/>
    
    <div class="App-header">
      {obj.map((i)=><Moviecomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]} id={i["movie_id"]} 
      name={i["Title"]}/>)}
     
    </div>
    </body>
  );
}
