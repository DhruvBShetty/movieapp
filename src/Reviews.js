import axios from 'axios';
import './App.css';
import {Reviewcomp,Sidebar,Rcomp,Recommend,Recomm} from './component';
import React,{useState} from 'react';
import swal from 'sweetalert';
import Select from 'react-select'
import { server_addr } from './utils/PrivateRoutes'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {token} from './utils/PrivateRoutes';

var mid=window.location.pathname.split('/')[2];
var sql=`SELECT * FROM movie_info WHERE movie_id="${mid}"`;
var sqlrev=`SELECT review FROM reviews WHERE movie_id="${mid}"`;

let obj = await axios.post(`http://${server_addr}/Filter`,[sql]).then(res=>res.data).catch(err=>{alert("Movie of this ID not found")});
let obj2 = await axios.post(`http://${server_addr}/Filter`,[sqlrev]).then(res=>res.data)


const options = [
  { value: "'1'", label: 'Positive' },
  { value: "'0'", label: 'Negative' },
  { value:"'0','1'",label:'All'}
];

export default function Reviews(){
    const [rec,setrec]=useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [rev, setrev] = useState("");
    const [safe,setsafe]= useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [sent,setsent]=useState(obj2);

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
      let tlink="http://localhost:8000/?text="+mrev;
      
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
          axios.post(`http://${server_addr}/Filter`,[psql]).then(res=>{window.location.reload()}).
          catch(err=>{
            if(err.response.data.errno===1062){
            swal({
              title: "Oops!",
              text: "Only one review per movie",
              icon: "info",
            })}
            else{
              swal({title: "Oops!",
              text: err.response.sql.code,
              icon: "info",
            })
          }});
        }
      
      });

    }

    return(
        <body class="body">
          
        <div class="App-header">
        <Sidebar/>
        {obj.map((i)=><Reviewcomp piclink={picpath+i["Picture"]} overview={i["Overview"]} voteavg={i["Vote_Avg"]}/>)}
        <div class="review">
        
        <h2 style={{textAlign:"center"}}>Reviews</h2>
        <Select 
        defaultValue={selectedOption}
        onChange={(choice)=>{setSelectedOption(choice.value);
          const sent_sql=`SELECT review FROM reviews WHERE movie_id="${mid}" and sentiment IN (${choice.value});`;
          axios.post(`http://${server_addr}/Filter`,[sent_sql]).then((res)=>{
            setsent(res.data)
          })
        }}
        options={options}
        className="mb-3"
        styles={{option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? '#fff' : '#333',
          backgroundColor: state.isSelected
            ? '#0052cc'
            : state.isFocused
            ? '#f0f0f0'
            : '#fff',
        })}}
        />
         
        {sent.map((i)=><Rcomp review={i["review"]}/>)}
        
        </div>
       <div id="error-message" style={{color: "red",width:"20px"}}></div>
       <div class="revcomp">
       <div class="rbox">
        <h2>Submit Review</h2>
        <form id="revform" onSubmit={handlechange}>
        <textarea rows="5" id="mreview" minLength="50" style={{width:"auto"}} required></textarea>
        <br/>
        <input type="submit" name="rsubmit" value="Submit"/>
        </form>
        </div>
        <div class="recommend">
        <Button variant="primary" onClick={() => {setModalShow(true);
          const recsql=`SELECT * from recommend,movie_info where recommend.rid=movie_info.movie_id and mid=${mid};`
          axios.post(`http://${server_addr}/Filter`,[recsql]).then((res)=>{
            setrec(res.data);
          }
          )
        }} style={{backgroundColor:"black"}}>
        Recommend Movies like this
        </Button>
        </div>
        <Recommend
        show={modalShow}
        onHide={() => setModalShow(false)}
        obj={rec}
        />
        </div>
       </div>
       
        </body>

    );

}