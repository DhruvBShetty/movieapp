import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { Sidebar } from './component';
import { server_addr } from './utils/PrivateRoutes';
import swal from 'sweetalert';

let token = await axios.get(`http://${server_addr}/getsession`).then(res=>res.data);


 function Updatemovieinfo() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        id:'',
        genre:'',
        overview:'',
        voteavg:'',
        picture:''
        })

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{           
    event.preventDefault();
    console.log(values);

    const colnames=[`movie_id`,	
        `Genre`,	
        `Overview`,	
        `Vote_Avg`,	
        `Picture`];
    
    var c=0;
    var arr=[];
    for(var i in values){
        if (i!="id" && values[i]!=''){
            arr.push(colnames[c]+"="+`"${values[i]}"`);
            
        }
        c++;
    }
    
    var sql=`UPDATE movie_info SET ${arr.join(",")} WHERE movie_id='${values.id}';`;
    console.log(sql);
    axios.post(`http://${server_addr}/generalup`,[sql])
    .then(res=>{
        
        navigate('/');
    })
    .catch(err=>{
        document.getElementById("error-message").textContent=err["response"]["data"];
        console.log(err["response"]["data"]);
    })
}

    if(token.admin===1){
    return (
        <body class="body">
            <Sidebar/>
        <div class="formbody">
        <div className="form-style">
            <h2>Update Movie info</h2>
            <form action="" onSubmit={handleSubmit} id="usrform">
                <p>
                    <label>Movie_id</label><br/>
                    <input type="number" name="id" onChange={handleInput} required />
                </p>
                <p>
                    <label>Genre</label><br/>
                    <select type="text" name="genre"  onChange={handleInput}>
                    <option value=''>Pick</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option></select>
                </p>
                <p>
                    <label>Overview</label><br/>
                    <textarea name="overview" form="usrform" onChange={handleInput} maxLength="400" rows="5" cols="30" ></textarea>
                </p>
                <p>
                    <label>Vote_Avg</label><br/>
                    <input type="number" step="0.01" name="voteavg" onChange={handleInput} />
                </p>

                <p>
                    <label>Picture</label><br/>
                    <input type="text" name="picture"  onChange={handleInput} />
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">submit</button>
                </p>
                <div id="error-message" style={{color: "red",width:"200px"}}></div>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </div>
        </body>
    )
}
else{
    swal({
        title: "Admin Access!",
        text: "Sorry, you don't have access to this feature",
        icon: "info"
      }).then(res=>{navigate('/')})
}

}

export default Updatemovieinfo;