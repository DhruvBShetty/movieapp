import axios from 'axios';
import './App.css';
import {Reviewcomp,Sidebar,Rcomp} from './component';
import React,{useState} from 'react';
import swal from 'sweetalert';



var mid=window.location.pathname.split('/')[2];
var sql=`SELECT * FROM movie_info WHERE movie_id="${mid}"`;
var sqlrev=`SELECT review FROM reviews WHERE movie_id="${mid}"`;

let obj = await axios.post('http://localhost:8081/Filter',[sql]).then(res=>res.data).catch(err=>{alert("Movie of this ID not found")});
let obj2 = await axios.post('http://localhost:8081/Filter',[sqlrev]).then(res=>res.data).catch(err=>{alert("Movie of this ID not found")});
let token = await axios.get("http://localhost:8081/getsession").then(res=>res.data);


export default function Reviews(){

    const [rev, setrev] = useState("");
    const [safe,setsafe]= useState("");

    const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
    // console.log(picpath+obj[0]["Picture"]);
    // const [obj,setObj]=useState([]);

    const handlechange=(event)=>{
      event.preventDefault();
      setrev(event.target.value);
      // console.log(rev);
      // document.getElementById("revform").action="http://127.0.0.1:8000/?text="+document.getElementById("mreview").value;
      // document.getElementById("revform").submit();
      
      let mrev=token.uname+": "+document.getElementById("mreview").value;
      let tlink="http://127.0.0.1:8000/?text="+mrev;
      
      let obj =axios.post(tlink).then(res=>{console.log(res.data.message);
        let safe1=res.data.message;
        let sent=res.data.sentiment;
        if(safe1 === "Not appropriate :("){
          swal({
            title: "Swearing Found!",
            text: "Please leave an appropriate review.",
            icon: "warning",
            dangerMode: true,
          })
        }
        else if (safe1 === "Safe content"){  
          let psql= `INSERT INTO reviews(movie_id,account_id,review,sentiment) VALUES (${mid},${token.uid},"${mrev}",${sent})`;
          axios.post("http://localhost:8081/Filter",[psql]).then(res=>{window.location.reload()});
        }
      
      });

    }

    return(
        <body class="body">
        <Sidebar/>

        
        <div class="App-header">
        
        {obj.map((i)=><Reviewcomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]}/>)}
        <div class="review">
        <h2 style={{textAlign:"center"}}>Reviews</h2>
        {obj2.map((i)=><Rcomp review={i["review"]}/>)}
        </div>
       <div id="error-message" style={{color: "red",width:"20px"}}></div>
       <div class="review">
       <div class="rbox">
        <h2>Submit Review</h2>
        <form id="revform" onSubmit={handlechange}>
        <textarea rows="10" cols="50" id="mreview" minLength="6"></textarea>
        <input type="submit" name="rsubmit" value="Submit"/>
        </form>
        </div>
        </div>
       </div>
        </body>

    );

}