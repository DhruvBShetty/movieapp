// import './App.css';
// import {Moviecomp,Sidebar,Actor, Actorcomp} from './component';
// import axios from 'axios';

// import React from 'react';

// let obj=await axios.get('http://localhost:8081/Actors').then(res=>res.data);


// export default function Actors() {

//   const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
  

//   return (
    
//     <body class="body">
//       <Sidebar/>
//     <div class="App-header">
//       {obj.map((i)=><Actorcomp piclink={picpath+i["Picture"]} name={i["Name"]} bio={i["Biography"]}/>)}

//       {/* <Moviecomp piclink={picpath+obj[0]["Picture"]} overview={obj[0]["Overview"]} voteavg={obj[0]["Vote_Avg"]}/> */}
     
//     </div>
//     </body>
//   );
// }

