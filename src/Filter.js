import './App.css';
import {Moviecomp,Sidebar,Filtercomp,Reviewcomp} from './component';
import axios, { AxiosError } from 'axios';
import React,{useState} from 'react'
import swal from 'sweetalert';



export default function Filter() {

    
    const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

    const [values,setValues]=useState({
        genre1:'',
        genre2:'',
        movie:'',
        vote_avg:1,
        });
    
    var [obj,setObj]=useState(["start"]);

    React.useEffect(() => {
      if (obj.length==0) {
        swal({
          title: "Not Found!",
          text: "Sorry, the movie is not available",
        })
      } 
    },[obj])

    // function checkob(){
    //   if (obj.length==0){
    //     swal({
    //       title: "Not Found!",
    //       text: "Sorry, the movie is not available",
    //     })
    //   }
    // }
      
    const handleSubmit=(event)=>{
    event.preventDefault();       
    var sql=``;
    if(values.movie!=''){
       sql=`SELECT movie_id,Genre,Overview,Vote_Avg,Picture,Title FROM movie 
       INNER JOIN movie_info ON movie.Id=movie_info.movie_id 
       WHERE title="${values.movie}"`;
    }
    else if(values.genre1=='' && values.genre2==''){
      sql=`SELECT * FROM movie_info,movie WHERE Vote_Avg>${values.vote_avg!=''?values.vote_avg:1} and movie.Id=movie_info.movie_id ORDER BY Vote_Avg DESC`;
    }
    else{
        sql=`SELECT * FROM movie_info,movie WHERE (Genre='${values.genre1}' OR Genre='${values.genre2}') AND Vote_Avg>${values.vote_avg!=''?values.vote_avg:1} 
        and movie.Id=movie_info.movie_id ORDER BY Vote_Avg DESC`;
    }
    console.log(sql);
    axios.post('http://localhost:8081/Filter',[sql]).then((res) => {
        // Update the 'obj' property by creating a new array
        console.log(res.data);
        setObj(res.data);
      })

}


const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

  

  return (
    
    <body class="body">
      <Sidebar/>
      
      <form action="" onSubmit={handleSubmit}>
                 <p>
                    <label class="flab">Find movie</label>
                    <input type="text" name="movie" onChange={handleInput}/>
                 </p>
                <p>
                    <label class="flab">Pick first Genre</label><br/>
                    <select name="genre1" id="genre1" onChange={handleInput}>
                    <option value="">Pick</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                    </select>
                </p>
                <p>
                    <label class="flab">Pick Second Genre</label><br/>
                    <select name="genre2" id="genre2" onChange={handleInput}>
                    <option value="">Pick</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                    </select>
                </p>
                <p>
                    <label class="flab">Rating {'>'}=</label><br/>
                    <input type="number" name="vote_avg" onChange={handleInput} step="0.1" min="1" max="10"/>
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">Submit</button>
                </p>
            </form>


    <div class="App-header">
      {obj!="start"?obj.map((i)=><Moviecomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]} id={i["movie_id"]}
      name={i["Title"]}/>):<p></p>}
      <div id="error-message" style={{color: "red",width:"200px"}}></div>
    </div>
    </body>
  );
}

