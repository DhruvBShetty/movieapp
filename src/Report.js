import './App.css';
import {Moviecomp,Sidebar} from './component';
import axios from 'axios';

import React from 'react';

// let obj1=await axios.get('http://localhost:8081/Report1').then(res=>res.data);

// let obj2=await axios.get('http://localhost:8081/Report2').then(res=>res.data);

// let obj3=await axios.get('http://localhost:8081/Report3').then(res=>res.data);

let token=await axios.get("http://localhost:8081/getsession2",{
  withCredentials: true
}).then(res=>res.data);

console.log(document.cookie);


export default function Report() {

  
  return (
    
    <body class="body">
      <Sidebar/>
    <div class="App-header">

     
     {/* <table style={{width:"50%",height:"50%",fontSize:"60%",color:"white",borderSpacing:"15px",backgroundColor:"black",margin:"5px"}}>
     <caption><h3>Genre Report</h3></caption>
     <thead>
        <tr>
          <th>Genre</th>
          <th>Genre_Count</th>
          <th>Avg Revenue/Genre</th>
          <th>Avg Budget/Genre</th>
          <th>Avg Profit/Genre</th>
          <th>Avg_runtime</th>
          <th>Avg_vote</th>
          {/* Add more headers as needed 
        </tr>
      </thead>
      <tbody>
        {obj1.map((it) => (
          <tr>
            <td>{it.Genre}</td>
            <td>{it['COUNT(Genre)']}</td>
            <td>{it['AVG(Revenue)']}</td>
            <td>{it['AVG(Budget)']}</td>
            <td>{it['Profit']}</td>
            <td>{it['AVG_runtime']}</td>
            <td>{it['AVG(Vote_Avg)'].toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      </table> */}
      
   
     
      
    {/* //   <table style={{width:"50%",height:"50%",fontSize:"60%",color:"white",borderSpacing:"15px",backgroundColor:"black",margin:"5px"}}>
    //  <caption><h3>Cast_crew Report</h3></caption>
    //  <thead>
    //     <tr>
    //       <th>Cast_crew Name</th>
    //       <th>Number of movies</th>
    //       <th>Number of genres</th>
    //       <th>Avg Rating in acted movies</th>
    //        Add more headers as needed 
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {obj3.map((it) => (
    //       <tr>
    //         <td>{it['name']}</td>
    //         <td>{it['countofmovies']}</td>
    //         <td>{it['num_of_genres']}</td>
    //         <td>{it['AVG(movie_info.Vote_Avg)'].toFixed(2)}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    //   </table> */}
     
    </div>
    </body>
  );
}

